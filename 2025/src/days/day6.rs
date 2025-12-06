use std::{fs, u64};

pub fn run() {
    let input = fs::read_to_string("../files/2025_06_input.txt").unwrap();

    println!("{}", part1(&input));
    println!("{}", part2(&input));
}

struct Column {
    numbers: Vec<u32>,
    operation: char,
}

fn part1(input: &String) -> u64 {
    let mut columns: Vec<Column> = Vec::new();

    for line in input.lines() {
        for (col, val) in line.split_whitespace().enumerate() {
            if columns.get(col).is_none() {
                columns.push(Column {
                    numbers: Vec::new(),
                    operation: ' ',
                });
            }

            let column = columns.get_mut(col).unwrap();

            match val.parse::<u32>() {
                Ok(n) => column.numbers.push(n),
                Err(_) => column.operation = val.chars().nth(0).unwrap(),
            }
        }
    }

    let columns: &Vec<Column> = &columns;
    let mut total: u64 = 0;
    for column in columns {
        let numbers = &column.numbers;
        if column.operation == '+' {
            total += numbers.iter().map(|&n| n as u64).sum::<u64>();
        } else {
            total += numbers.iter().map(|&n| n as u64).product::<u64>();
        }
    }

    return total;
}

fn part2(input: &String) -> u64 {
    let mut total: u64 = 0;

    let lines: Vec<_> = input.lines().collect();
    let max_length = lines.clone().into_iter().map(|l| l.len()).max().unwrap();

    let mut operation = '+';
    let mut numbers: Vec<u64> = Vec::new();

    for x in 0..max_length {
        let mut n = 0;

        for l in &lines {
            let char = l.chars().nth(x).unwrap_or(' ');

            match char {
                '+' => operation = char,
                '*' => operation = char,
                '0'..='9' => n = n * 10 + (char as u64 - b'0' as u64),
                _ => (),
            }
        }

        if n == 0 {
            if operation == '+' {
                total += numbers.iter().sum::<u64>();
            } else {
                total += numbers.iter().product::<u64>();
            }
            numbers.clear();
        } else {
            numbers.push(n);
        }
    }

    if operation == '+' {
        total += numbers.iter().sum::<u64>();
    } else {
        total += numbers.iter().product::<u64>();
    }

    return total;
}
