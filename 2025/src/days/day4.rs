use std::{collections::HashSet, fs};

pub fn run() {
    let input = fs::read_to_string("../files/2025_04_input.txt").unwrap();

    let (part1, part2) = solve(&input);

    println!("{}", part1);
    println!("{}", part2);
}

fn solve(input: &str) -> (u32, u32) {
    let mut rolls: HashSet<(usize, usize)> = HashSet::new();

    for (y, line) in input.lines().enumerate() {
        for (x, c) in line.chars().enumerate() {
            if c == '@' {
                rolls.insert((x, y));
            }
        }
    }

    let mut count = 0;
    let mut part1 = 0;

    loop {
        let mut removed: HashSet<(usize, usize)> = HashSet::new();

        for &r in &rolls {
            if neighbour_count(&rolls, r) < 4 {
                removed.insert(r);
                count += 1;
            }
        }

        if part1 == 0 {
            part1 = count;
        }

        if removed.len() == 0 {
            break;
        }

        rolls = rolls.difference(&removed).map(|x| *x).collect();
    }

    return (part1, count);
}

fn neighbour_count(rolls: &HashSet<(usize, usize)>, (x, y): (usize, usize)) -> u32 {
    let mut count = 0;

    if x > 0 && y > 0 && rolls.contains(&(x - 1, y - 1)) {
        count += 1
    }
    if y > 0 && rolls.contains(&(x, y - 1)) {
        count += 1
    }
    if y > 0 && rolls.contains(&(x + 1, y - 1)) {
        count += 1
    }
    if x > 0 && rolls.contains(&(x - 1, y)) {
        count += 1
    }
    if rolls.contains(&(x + 1, y)) {
        count += 1
    }
    if x > 0 && rolls.contains(&(x - 1, y + 1)) {
        count += 1
    }
    if rolls.contains(&(x, y + 1)) {
        count += 1
    }
    if rolls.contains(&(x + 1, y + 1)) {
        count += 1
    }

    return count;
}
