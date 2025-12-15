use std::{collections::HashSet, fs};

use regex::Regex;

#[derive(Debug)]
struct Present {
    perms: Vec<HashSet<(usize, usize)>>,
    size: usize,
}

impl Present {
    fn from_string(string: &&str) -> Self {
        let mut set = HashSet::<(usize, usize)>::new();

        for (y, l) in string.lines().skip(1).enumerate() {
            for (x, c) in l.chars().enumerate() {
                if c == '#' {
                    set.insert((x, y));
                }
            }
        }

        let ps = vec![
            set.clone(),
            set.iter().map(|(x, y)| (2 - x, *y)).collect(),
            set.iter().map(|(x, y)| (*x, 2 - y)).collect(),
            set.iter().map(|(x, y)| (2 - x, 2 - y)).collect(),
            set.iter().map(|(x, y)| (*y, *x)).collect(),
            set.iter().map(|(x, y)| (2 - y, *x)).collect(),
            set.iter().map(|(x, y)| (*y, 2 - x)).collect(),
            set.iter().map(|(x, y)| (2 - y, 2 - x)).collect(),
        ];

        let mut perms: Vec<HashSet<(usize, usize)>> = Vec::new();

        for p in ps {
            if perms
                .iter()
                .all(|p2| !p.iter().all(|point| p2.contains(point)))
            {
                perms.push(p);
            }
        }

        Self {
            size: set.len(),
            perms,
        }
    }
}

#[derive(Debug)]
struct Space {
    width: usize,
    height: usize,
    counts: [usize; 6],
}

impl Space {
    fn from_string(string: &str) -> Self {
        let exp = Regex::new(r"(\d+)x(\d+): (\d+) (\d+) (\d+) (\d+) (\d+) (\d+)").unwrap();
        let captures = exp.captures(string).unwrap();

        Self {
            width: captures.get(1).unwrap().as_str().parse().unwrap(),
            height: captures.get(2).unwrap().as_str().parse().unwrap(),
            counts: [
                captures.get(3).unwrap().as_str().parse().unwrap(),
                captures.get(4).unwrap().as_str().parse().unwrap(),
                captures.get(5).unwrap().as_str().parse().unwrap(),
                captures.get(6).unwrap().as_str().parse().unwrap(),
                captures.get(7).unwrap().as_str().parse().unwrap(),
                captures.get(8).unwrap().as_str().parse().unwrap(),
            ],
        }
    }
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_12_input.txt").unwrap();
    let (presents, spaces) = parse(&input);

    println!("{}", part1(&presents, &spaces));
}

fn parse(_input: &str) -> (Vec<Present>, Vec<Space>) {
    let paragraphs: Vec<_> = _input.split("\n\n").collect();
    let presents: Vec<Present> = paragraphs[0..paragraphs.len() - 1]
        .iter()
        .map(Present::from_string)
        .collect();

    let spaces: Vec<Space> = paragraphs[paragraphs.len() - 1]
        .lines()
        .map(Space::from_string)
        .collect();

    (presents, spaces)
}

fn part1(presents: &Vec<Present>, spaces: &Vec<Space>) -> usize {
    spaces
        .iter()
        .filter(|s| {
            if s.width * s.height >= s.counts.iter().sum::<usize>() * 9 {
                return true;
            }
            if s.width * s.height
                < s.counts
                    .iter()
                    .enumerate()
                    .map(|(i, c)| c * presents[i].size)
                    .sum()
            {
                return false;
            }

            panic!("Unsure")
        })
        .count()
}
