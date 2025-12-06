use std::fs;

pub fn run() {
    let input = fs::read_to_string("../files/2025_03_input.txt").unwrap();

    println!("{}", solve(&input, 2));
    println!("{}", solve(&input, 12));
}

fn find_max(line: &str, min_rest: usize) -> (u8, &str) {
    for n in (1..=9 as u8).rev() {
        let char_n = (b'0' + n) as char;
        let index = (&line[0..line.len() - min_rest]).find(char_n);

        match index {
            Some(i) => {
                return (n, &line[i + 1..line.len()]);
            }
            None => (),
        }
    }

    unreachable!()
}

fn solve(input: &str, size: usize) -> u64 {
    let mut joltage = 0;

    for mut line in input.lines() {
        if line.trim().len() > 0 {
            let mut value: u64 = 0;

            for m in (0..size).rev() {
                let v;
                (v, line) = find_max(line, m);
                value = value * 10 + v as u64;
            }

            joltage += value;
        }
    }

    return joltage;
}
