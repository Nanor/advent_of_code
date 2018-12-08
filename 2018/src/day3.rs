extern crate regex;

use regex::Regex;
use std::collections::HashMap;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;

#[derive(Debug)]
struct Claim {
    id: u32,
    x: u32,
    y: u32,
    w: u32,
    h: u32,
}

fn main() {
    let f = File::open("files/day3.txt").expect("File not found.");
    let file = BufReader::new(&f);

    let re = Regex::new(r"#(\d+) @ (\d+),(\d+): (\d+)x(\d+)").unwrap();
    let claims: Vec<Claim> = file
        .lines()
        .filter_map(|line| line.ok())
        .map(|line| {
            let m = re.captures(line.as_str()).unwrap();
            Claim {
                id: m.get(1).map_or(0, |m| m.as_str().parse().unwrap()),
                x: m.get(2).map_or(0, |m| m.as_str().parse().unwrap()),
                y: m.get(3).map_or(0, |m| m.as_str().parse().unwrap()),
                w: m.get(4).map_or(0, |m| m.as_str().parse().unwrap()),
                h: m.get(5).map_or(0, |m| m.as_str().parse().unwrap()),
            }
        }).collect();

    let mut fabric: HashMap<(u32, u32), u32> = HashMap::new();

    for claim in claims.iter() {
        for x in claim.x..claim.x + claim.w {
            for y in claim.y..claim.y + claim.h {
                let count = fabric.entry((x, y)).or_insert(0);
                *count += 1;
            }
        }
    }

    let overlap = fabric.values().filter(|&v| v > &1).count();
    println!("{}", overlap);

    'main: for claim in claims.iter() {
        for x in claim.x..claim.x + claim.w {
            for y in claim.y..claim.y + claim.h {
                let count = fabric.entry((x, y)).or_insert(0);
                if *count > 1 {
                    continue 'main;
                }
            }
        }
        println!("{}", claim.id);
    }
}
