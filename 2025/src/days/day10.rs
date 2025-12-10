use itertools::Itertools;
use microlp::{LinearExpr, OptimizationDirection, Problem};
use regex::Regex;
use std::fs;

#[derive(Debug, PartialEq, Eq, Hash)]
struct Machine {
    pattern: u16,
    buttons: Vec<Vec<usize>>,
    joltages: Vec<i32>,
}

impl Machine {
    fn from_line(line: &str) -> Self {
        let pattern_regex = Regex::new(r"\[[\.#]+\]").unwrap();

        let pattern = pattern_regex
            .find(line)
            .map(|s| {
                s.as_str()[1..s.len()]
                    .chars()
                    .enumerate()
                    .map(|(i, c)| if c == '#' { 1 << i } else { 0 })
                    .sum()
            })
            .unwrap();

        let button_regex = Regex::new(r"\([0-9,]+\)").unwrap();

        let buttons = button_regex
            .find_iter(line)
            .map(|s| {
                s.as_str()[1..s.len() - 1]
                    .split(',')
                    .map(|d| d.parse().unwrap())
                    .collect()
            })
            .collect();

        let joltage_regex = Regex::new(r"\{[0-9,]+\}").unwrap();

        let joltages = joltage_regex
            .find(line)
            .map(|s| {
                s.as_str()[1..s.len() - 1]
                    .split(',')
                    .map(|d| d.parse().unwrap())
                    .collect()
            })
            .unwrap();

        Self {
            pattern,
            buttons,
            joltages,
        }
    }
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_10_input.txt").unwrap();
    let _input = "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
    [...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
    [.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}";

    let machines: Vec<_> = input.lines().map(Machine::from_line).collect();

    println!("{:?}", part1(&machines));
    println!("{:?}", part2(&machines));
}

fn part1(machines: &Vec<Machine>) -> usize {
    machines
        .iter()
        .map(|machine| {
            return machine
                .buttons
                .iter()
                .powerset()
                .filter(|set| {
                    machine.pattern
                        == set
                            .iter()
                            .map(|e| e.iter().map(|b| 1 << *b).sum())
                            .reduce(|acc, e| acc ^ e)
                            .unwrap_or(0)
                })
                .map(|s| s.len())
                .min()
                .unwrap();
        })
        .sum::<usize>()
}

fn part2(machines: &Vec<Machine>) -> u64 {
    let mut total = 0;
    for machine in machines {
        total += solve(machine);
    }

    return total;
}

fn solve(machine: &Machine) -> u64 {
    let mut problem = Problem::new(OptimizationDirection::Minimize);

    let buttons: Vec<_> = machine
        .buttons
        .iter()
        .map(|_| problem.add_integer_var(1.0, (0, 1000000)))
        .collect();

    for (i, &j) in machine.joltages.iter().enumerate() {
        let mut expr = LinearExpr::empty();

        for (n, b) in machine.buttons.iter().enumerate() {
            if b.contains(&i) {
                expr.add(buttons[n], 1.);
            }
        }
        problem.add_constraint(expr, microlp::ComparisonOp::Eq, j as f64);
    }

    let solution = problem.solve().unwrap();
    return buttons.iter().map(|b| solution[*b].round() as u64).sum();
}
