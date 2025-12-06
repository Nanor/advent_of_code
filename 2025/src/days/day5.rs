use std::fs;

#[derive(Debug)]
struct Range {
    min: u64,
    max: u64,
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_05_input.txt").unwrap();
    let mut paragraphs = input.split("\n\n");

    let ranges: Vec<Range> = paragraphs
        .next()
        .unwrap()
        .lines()
        .filter(|l| l.trim().len() > 0)
        .map(|l| {
            let mut vs = l.trim().split('-');

            return Range {
                min: vs.next().unwrap().parse().unwrap(),
                max: vs.next().unwrap().parse().unwrap(),
            };
        })
        .collect();

    let ingredients: Vec<u64> = paragraphs
        .next()
        .unwrap()
        .lines()
        .filter(|l| l.trim().len() > 0)
        .map(|l| l.trim().parse().unwrap())
        .collect();

    println!("{}", part1(&ranges, &ingredients));
    println!("{}", part2(&ranges));
}

fn part1(ranges: &Vec<Range>, ingredients: &Vec<u64>) -> u64 {
    let mut count = 0;

    for &ingredient in ingredients {
        if ranges
            .iter()
            .any(|r| ingredient >= r.min && ingredient <= r.max)
        {
            count += 1;
        }
    }

    return count;
}

fn part2(ranges: &Vec<Range>) -> u64 {
    let mut count = 0;
    let mut ingredient = 0;

    loop {
        let next_max = ranges
            .iter()
            .filter(|&r| ingredient >= r.min && ingredient <= r.max)
            .map(|r| r.max)
            .max();

        match next_max {
            Some(m) => {
                count += m - ingredient + 1;
                ingredient = m + 1;
                continue;
            }
            None => (),
        }

        let next_min = ranges
            .iter()
            .map(|r| r.min)
            .filter(|m| m >= &ingredient)
            .min();

        match next_min {
            Some(m) => ingredient = m,
            None => break,
        }
    }

    return count;
}
