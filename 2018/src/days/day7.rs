use itertools::Itertools;
use regex::Regex;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn part1(edges: &Vec<(char, char)>) {
    let all_steps: Vec<char> = edges
        .iter()
        .flat_map(|(a, b)| vec![*a, *b])
        .unique()
        .collect();

    let mut done_steps: Vec<char> = Vec::new();

    loop {
        let blocked: Vec<&char> = edges
            .iter()
            .filter(|(a, _)| !&done_steps.contains(a))
            .map(|(_, b)| b)
            .collect();
        let mut avail_steps: Vec<&char> = all_steps
            .iter()
            .filter(|a| !blocked.contains(&a) && !&done_steps.contains(&a))
            .collect();
        avail_steps.sort();

        match avail_steps.iter().next() {
            Some(c) => done_steps.push(**c),
            None => break,
        };
    }

    let result: String = done_steps.iter().collect();
    println!("{}", result);
}

fn part2(edges: &Vec<(char, char)>) {
    let mut timer = 0;
    let all_steps: Vec<char> = edges
        .iter()
        .flat_map(|(a, b)| vec![*a, *b])
        .unique()
        .collect();
    let mut done_steps: Vec<char> = Vec::new();
    let mut workers: Vec<(char, u32)> = Vec::new();

    let overhead = 60;
    let worker_count = 5;
    let alphabet = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    loop {
        while workers.len() < worker_count {
            let blocked: Vec<&char> = edges
                .iter()
                .filter(|(a, _)| !&done_steps.contains(a))
                .map(|(_, b)| b)
                .collect();
            let mut avail_steps: Vec<&char> = all_steps
                .iter()
                .filter(|a| {
                    !blocked.contains(&a)
                        && !&done_steps.contains(&a)
                        && &workers.iter().map(|(c, _)| c).filter(|c| &c == &a).count()
                            == &(0 as usize)
                })
                .collect();
            avail_steps.sort();

            match avail_steps.iter().next() {
                Some(c) => workers.push((**c, overhead + alphabet.find(**c).unwrap() as u32)),
                None => break,
            }
        }

        if workers.len() == 0 {
            break;
        }

        timer += 1;
        workers = workers.iter().map(|(c, t)| (*c, t - 1)).collect();
        for &(c, t) in &workers {
            if t == 0 {
                done_steps.push(c)
            }
        }
        workers.retain(|&(_, t)| t > 0);
    }

    println!("{}", timer);
}

pub(crate) fn main() {
    let f = File::open("../files/2018_07_input.txt").expect("File not found.");
    let file = BufReader::new(&f);

    let re = Regex::new(r"Step (\w) must be finished before step (\w) can begin.").unwrap();
    let edges: Vec<(char, char)> = file
        .lines()
        .filter_map(|line| line.ok())
        .map(|line| {
            let m = re.captures(&line).unwrap();
            (
                m.get(1).unwrap().as_str().chars().next().unwrap(),
                m.get(2).unwrap().as_str().chars().next().unwrap(),
            )
        })
        .collect();

    part1(&edges);
    part2(&edges);
}
