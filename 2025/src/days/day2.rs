use std::{fs, u64};

#[derive(Debug)]
struct Range {
    min: u64,
    max: u64,
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_02_input.txt").unwrap();

    let ranges: Vec<Range> = input
        .split(",")
        .filter(|l| l.trim().len() > 0)
        .map(|l| {
            let mut vs = l.trim().split('-');

            return Range {
                min: vs.next().unwrap().parse().unwrap(),
                max: vs.next().unwrap().parse().unwrap(),
            };
        })
        .collect();

    println!("{}", solve(&ranges, false));
    println!("{}", solve(&ranges, true));
}

fn solve(ranges: &Vec<Range>, part2: bool) -> u64 {
    let mut sum = 0;

    for range in ranges {
        for x in range.min..=range.max {
            let length = ((x as f64).log10().floor() + 1.0) as u32;

            for i in 2..=(if part2 { length } else { 2 }) {
                if length % i == 0 {
                    let mut div = 1;
                    for _ in 1..i {
                        div = div * 10_u64.pow(length / i) + 1
                    }

                    if x % div == 0 {
                        sum += x;
                        break;
                    }
                }
            }
        }
    }

    return sum;
}
