use std::fs;

pub fn run() {
    let input = fs::read_to_string("../files/2025_01_input.txt").unwrap();

    println!("{}", part1(&input));
    println!("{}", part2(&input));
}

fn part1(input: &str) -> u32 {
    let mut dial = 1000050;
    let mut count = 0;

    for line in input.lines() {
        let dir = &line[0..1];
        let a: &u32 = &line[1..].parse().unwrap();

        if dir == "L" {
            dial -= a;
        } else {
            dial += a;
        }

        if dial % 100 == 0 {
            count += 1;
        }
    }

    return count;
}

fn part2(input: &str) -> u32 {
    let mut dial = 1000050;
    let mut count = 0;

    for line in input.lines() {
        let dir = &line[0..1];
        let a: &u32 = &line[1..].parse().unwrap();

        let old_dial = dial;

        if dir == "L" {
            dial -= a;
        } else {
            dial += a;
        }

        let mut c = (old_dial / 100).abs_diff(dial / 100);
        if dir == "L" {
            if dial % 100 == 0 {
                c += 1;
            }
            if old_dial % 100 == 0 {
                c -= 1
            }
        }

        count += c;
    }

    return count;
}
