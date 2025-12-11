mod days;

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    match args.get(1) {
        Some(d) => match d.parse() {
            Ok(1) => days::day1::run(),
            Ok(2) => days::day2::run(),
            Ok(3) => days::day3::run(),
            Ok(4) => days::day4::run(),
            Ok(5) => days::day5::run(),
            Ok(6) => days::day6::run(),
            Ok(7) => days::day7::run(),
            Ok(8) => days::day8::run(),
            Ok(9) => days::day9::run(),
            Ok(10) => days::day10::run(),
            Ok(11) => days::day11::run(),
            _ => println!("Invalid day"),
        },
        None => println!("No day provided"),
    }
}
