use std::collections::HashMap;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;

fn part1() -> i32 {
  let f = File::open("files/day1.txt").unwrap();
  let file = BufReader::new(&f);

  let mut counter: i32 = 0;
  for (_, line) in file.lines().enumerate() {
    let num: i32 = line.unwrap().parse().expect("NaN");
    counter = counter + num;
  }

  return counter;
}

fn part2() -> i32 {
  let mut counter: i32 = 0;
  let mut values: HashMap<i32, bool> = HashMap::new();

  loop {
    let f = File::open("files/day1.txt").unwrap();
    let file = BufReader::new(&f);

    for (_, line) in file.lines().enumerate() {
      let num: i32 = line.unwrap().parse().expect("NaN");
      counter = counter + num;

      match values.get(&counter) {
        Some(_) => return counter,
        None => values.insert(counter, true),
      };
    }
  }
}

fn main() {
  println!("{}", part1());
  println!("{}", part2());
}
