use regex::Regex;
use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::str::FromStr;

#[allow(dead_code)]
fn draw(
    clay: &HashSet<(usize, usize)>,
    flowing: &HashSet<(usize, usize)>,
    settled: &HashSet<(usize, usize)>,
) {
    let min_x = *clay.iter().map(|(x, _)| x).min().unwrap() - 1;
    let max_x = *clay.iter().map(|(x, _)| x).max().unwrap() + 1;
    let min_y = *clay.iter().map(|(_, y)| y).min().unwrap() - 1;
    let max_y = *clay.iter().map(|(_, y)| y).max().unwrap() + 1;

    for y in min_y..=max_y {
        for x in min_x..=max_x {
            if clay.contains(&(x, y)) {
                print!("#")
            } else if settled.contains(&(x, y)) {
                print!("~")
            } else if flowing.contains(&(x, y)) {
                print!("|")
            } else {
                print!(".")
            }
        }
        println!("")
    }
    println!("")
}

fn drop(
    clay: &HashSet<(usize, usize)>,
    flowing: &mut HashSet<(usize, usize)>,
    settled: &mut HashSet<(usize, usize)>,
    x: usize,
    start_y: usize,
) {
    let max_y = *clay.iter().map(|(_, y)| y).max().unwrap();
    let mut y = start_y;

    loop {
        if y > max_y {
            return;
        }

        if !clay.contains(&(x, y + 1)) && !settled.contains(&(x, y + 1)) {
            if flowing.contains(&(x, y)) {
                return;
            } else {
                flowing.insert((x, y));
                y += 1
            }
        } else {
            let mut min_x = x;
            loop {
                if !clay.contains(&(min_x - 1, y))
                    && (clay.contains(&(min_x, y + 1)) || settled.contains(&(min_x, y + 1)))
                {
                    min_x -= 1;
                } else {
                    break;
                }
            }

            let mut max_x = x;
            loop {
                if !clay.contains(&(max_x + 1, y))
                    && (clay.contains(&(max_x, y + 1)) || settled.contains(&(max_x, y + 1)))
                {
                    max_x += 1;
                } else {
                    break;
                }
            }

            let filled = (clay.contains(&(min_x, y + 1)) || settled.contains(&(min_x, y + 1)))
                && (clay.contains(&(max_x, y + 1)) || settled.contains(&(max_x, y + 1)));

            for x in min_x..=max_x {
                if filled {
                    settled.insert((x, y));
                } else {
                    flowing.insert((x, y));
                }
            }

            if !(clay.contains(&(min_x, y + 1)) || settled.contains(&(min_x, y + 1))) {
                drop(clay, flowing, settled, min_x, y + 1);
            }
            if !(clay.contains(&(max_x, y + 1)) || settled.contains(&(max_x, y + 1))) {
                drop(clay, flowing, settled, max_x, y + 1);
            }

            if filled {
                y -= 1;
            } else {
                return;
            }
        }
    }
}

pub(crate) fn main() {
    let f = File::open("../files/2018_17_input.txt").expect("File not found.");
    let file = BufReader::new(&f);
    let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

    let mut clay: HashSet<(usize, usize)> = HashSet::new();

    let matcher = Regex::new(r"([xy])=(\d+), ([xy])=(\d+)..(\d+)").unwrap();
    for line in lines {
        let m = matcher.captures(&line).unwrap();

        let small = usize::from_str(m.get(2).unwrap().as_str()).unwrap();
        let long_start = usize::from_str(m.get(4).unwrap().as_str()).unwrap();
        let long_end = usize::from_str(m.get(5).unwrap().as_str()).unwrap();

        let static_dir = m.get(1).unwrap().as_str();

        for l in long_start..=long_end {
            if static_dir == "x" {
                clay.insert((small, l));
            } else {
                clay.insert((l, small));
            }
        }
    }

    let min_y = *clay.iter().map(|(_, y)| y).min().unwrap();
    let mut flowing: HashSet<(usize, usize)> = HashSet::new();
    let mut settled: HashSet<(usize, usize)> = HashSet::new();

    // draw(&clay, &flowing, &settled);

    drop(&clay, &mut flowing, &mut settled, 500, min_y);

    // draw(&clay, &flowing, &settled);

    let water: HashSet<_> = flowing.union(&settled).collect();
    println!("{}", water.len());
    println!("{}", settled.len());
}
