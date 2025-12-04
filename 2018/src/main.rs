extern crate chrono;
extern crate itertools;
extern crate num_derive;
extern crate num_traits;
extern crate pathfinding;
extern crate regex;

mod days;

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    match args.get(1) {
        Some(d) => match d.parse() {
            Ok(1) => days::day1::main(),
            Ok(2) => days::day2::main(),
            Ok(3) => days::day3::main(),
            Ok(4) => days::day4::main(),
            Ok(5) => days::day5::main(),
            Ok(6) => days::day6::main(),
            Ok(7) => days::day7::main(),
            Ok(8) => days::day8::main(),
            Ok(9) => days::day9::main(),
            Ok(10) => days::day10::main(),
            Ok(11) => days::day11::main(),
            Ok(12) => days::day12::main(),
            Ok(13) => days::day13::main(),
            Ok(14) => days::day14::main(),
            Ok(15) => days::day15::main(),
            Ok(16) => days::day16::main(),
            Ok(17) => days::day17::main(),
            Ok(18) => days::day18::main(),
            Ok(19) => days::day19::main(),
            Ok(20) => days::day20::main(),
            Ok(21) => days::day21::main(),
            Ok(22) => days::day22::main(),
            Ok(23) => days::day23::main(),
            Ok(24) => days::day24::main(),
            Ok(25) => days::day25::main(),
            _ => println!("Invalid day"),
        },
        None => println!("No day provided"),
    }
}
