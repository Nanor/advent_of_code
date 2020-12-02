extern crate regex;

use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug, Clone, Copy, PartialEq)]
enum Type {
  Open,
  Tree,
  Lumber,
}

fn main() {
  let f = File::open("files/day18.txt").expect("File not found.");
  let file = BufReader::new(&f);
  let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

  let mut grid: HashMap<(usize, usize), Type> = HashMap::new();

  let h = lines.len();
  let w = lines.get(0).unwrap().len();

  for (y, line) in lines.iter().enumerate() {
    for (x, c) in line.chars().enumerate() {
      let cell = match c {
        '.' => Type::Open,
        '|' => Type::Tree,
        '#' => Type::Lumber,
        _ => panic!(),
      };

      grid.insert((x, y), cell);
    }
  }

  // print_grid(&grid, width, height);

  for _ in 1..=10 {
    grid = evolve(grid, w, h)

    // print_grid(&grid, width, height);
  }

  println!("{}", get_value(&grid, w, h));

  let mid_time = 500;

  for _ in 11..=mid_time {
    grid = evolve(grid, w, h);
  }

  let value = get_value(&grid, w, h);
  let mut loop_time = 0;

  loop {
    loop_time += 1;

    grid = evolve(grid, w, h);

    if value == get_value(&grid, w, h) {
      break;
    }
  }

  let end_time = 1000000000;

  let time_skip = (end_time - mid_time) % loop_time;

  for _ in 0..time_skip {
    grid = evolve(grid, w, h);
  }

  println!("{}", get_value(&grid, w, h));
}

fn evolve(
  grid: HashMap<(usize, usize), Type>,
  w: usize,
  h: usize,
) -> HashMap<(usize, usize), Type> {
  let mut new_grid: HashMap<(usize, usize), Type> = HashMap::new();

  for x in 0..w {
    for y in 0..h {
      let c = match grid.get(&(x, y)) {
        Some(Type::Open) => {
          if count_neighbours(&grid, x, y, Type::Tree) >= 3 {
            Type::Tree
          } else {
            Type::Open
          }
        }

        Some(Type::Tree) => {
          if count_neighbours(&grid, x, y, Type::Lumber) >= 3 {
            Type::Lumber
          } else {
            Type::Tree
          }
        }

        Some(Type::Lumber) => {
          if count_neighbours(&grid, x, y, Type::Lumber) >= 1
            && count_neighbours(&grid, x, y, Type::Tree) >= 1
          {
            Type::Lumber
          } else {
            Type::Open
          }
        }

        None => panic!(),
      };

      new_grid.insert((x, y), c);
    }
  }

  return new_grid;
}

fn get_value(grid: &HashMap<(usize, usize), Type>, w: usize, h: usize) -> usize {
  let mut trees = 0;
  let mut lumber = 0;

  for y in 0..w {
    for x in 0..h {
      match grid.get(&(x, y)) {
        Some(Type::Open) => (),
        Some(Type::Tree) => trees += 1,
        Some(Type::Lumber) => lumber += 1,
        None => (),
      };
    }
  }

  return trees * lumber;
}

fn _print_grid(grid: &HashMap<(usize, usize), Type>, w: usize, h: usize) {
  for y in 0..h {
    for x in 0..w {
      let cell = grid.get(&(x, y));
      let c = match cell {
        Some(Type::Open) => ".",
        Some(Type::Tree) => "|",
        Some(Type::Lumber) => "#",
        None => " ",
      };

      print!("{}", c);
    }
    println!("");
  }
  println!("");
}

fn count_neighbours(
  grid: &HashMap<(usize, usize), Type>,
  x: usize,
  y: usize,
  counted: Type,
) -> usize {
  let mut total = 0;

  for dx in -1..=1 {
    for dy in -1..=1 {
      if dx != 0 || dy != 0 {
        match grid.get(&((x as isize + dx) as usize, (y as isize + dy) as usize)) {
          Some(&x) => {
            if x == counted {
              total += 1
            }
          }
          _ => (),
        }
      }
    }
  }

  return total;
}
