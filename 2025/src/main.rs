mod days;

use std::env;

use crate::days::day1;

fn main() {
    let args: Vec<String> = env::args().collect();

    match args.get(1) {
        Some(d) => match d.parse() {
            Ok(1) => day1::run(),
            _ => println!("Invalid day"),
        },
        None => println!("No day provided"),
    }
}
