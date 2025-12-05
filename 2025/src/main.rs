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
            _ => println!("Invalid day"),
        },
        None => println!("No day provided"),
    }
}
