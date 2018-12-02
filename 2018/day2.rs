use std::collections::HashMap;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;

fn part1() -> u32 {
  let f = File::open("day2.txt").expect("No file found");
  let lines = BufReader::new(&f).lines();

  let mut two_count: u32 = 0;
  let mut three_count: u32 = 0;

  for line in lines {
    let line = line.expect("Can't read line");
    let mut letter_count: HashMap<char, u32> = HashMap::new();

    for c in line.chars() {
      let count = letter_count.entry(c).or_insert(0);
      *count += 1;
    }

    if letter_count.values().any(|&x| x == 2) {
      two_count += 1;
    }

    if letter_count.values().any(|&x| x == 3) {
      three_count += 1;
    }
  }

  two_count * three_count
}

fn part2() -> String {
  let f = File::open("day2.txt").expect("No file found");
  let lines = BufReader::new(&f).lines();

  for line in lines {
    let line = line.expect("Can't read line");
    let f = File::open("day2.txt").expect("No file found");
    let lines2 = BufReader::new(&f).lines();
    for line2 in lines2 {
      let line2 = line2.expect("Can't read line");

      let mut count = 0;
      for (c1, c2) in line.chars().zip(line2.chars()) {
        if c1 != c2 {
          count += 1;
        }
      }
      if count == 1 {
        let mut result = String::from("");
        for (c1, c2) in line.chars().zip(line2.chars()) {
          if c1 == c2 {
            result.push(c1);
          }
        }

        return result;
      }
    }
  }
  return String::from("");
}

fn main() {
  println!("{}", part1());
  println!("{}", part2());
}
