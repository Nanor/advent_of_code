extern crate regex;

use regex::Regex;
use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};

#[allow(dead_code)]
fn draw_plants(plants: &HashSet<i32>) {
  let min = *plants.iter().min().unwrap();
  let max = *plants.iter().max().unwrap();
  print!("{}", min);
  for i in min..=max {
    print!("{}", if plants.contains(&i) { '#' } else { '.' });
  }
  print!("{}", max);
  println!();
}

fn evolve(plants: &HashSet<i32>, patterns: &Vec<Vec<bool>>) -> HashSet<i32> {
  let mut new_plants = HashSet::new();

  let min = plants.iter().min().unwrap();
  let max = plants.iter().max().unwrap();

  for i in min - 2..=max + 2 {
    let surroundings: Vec<bool> = (i - 2..=i + 2).map(|p| plants.contains(&p)).collect();

    if patterns.contains(&surroundings) {
      new_plants.insert(i);
    }
  }

  new_plants
}

fn part1(plants: &HashSet<i32>, patterns: &Vec<Vec<bool>>, iter: u64) -> u64 {
  let mut plants: HashSet<i32> = plants.clone();
  for _ in 1..=iter {
    plants = evolve(&plants, &patterns);
  }
  plants.iter().sum::<i32>() as u64
}

fn part2(plants: &HashSet<i32>, patterns: &Vec<Vec<bool>>, iter: u64) -> u64 {
  let mut plants: HashSet<i32> = plants.clone();
  for _ in 1..=1000 {
    plants = evolve(&plants, &patterns);
  }
  plants.iter().sum::<i32>() as u64 + (plants.iter().count() as u64) * (iter - 1000)
}

fn main() {
  let f = File::open("files/day12.txt").expect("File not found.");
  let file = BufReader::new(&f);

  let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

  let init = Regex::new(r"initial state: ([#.]+)").unwrap();
  let mut plants: HashSet<i32> = HashSet::new();
  let init_line: String = lines
    .iter()
    .filter(|line| init.is_match(line))
    .map(|line| {
      let m = init.captures(line.as_str()).unwrap();
      String::from(m.get(1).unwrap().as_str())
    }).next()
    .unwrap();
  init_line.chars().enumerate().for_each(|(i, c)| {
    if c == '#' {
      plants.insert(i as i32);
    }
  });

  let re = Regex::new(r"([#.]{5}) => #").unwrap();
  let patterns: Vec<Vec<bool>> = lines
    .iter()
    .filter(|line| re.is_match(line))
    .map(|line| {
      let m = re.captures(line.as_str()).unwrap();
      String::from(m.get(1).unwrap().as_str())
        .chars()
        .map(|c| c == '#')
        .collect()
    }).collect();

  println!("{}", part1(&plants, &patterns, 20));
  println!("{}", part2(&plants, &patterns, 50000000000));

}
