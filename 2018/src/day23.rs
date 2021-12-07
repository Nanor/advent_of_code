extern crate regex;

use regex::Regex;
use std::cmp::{max, min, Ordering};
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug)]
struct Bot {
  x: i32,
  y: i32,
  z: i32,
  r: i32,
}

fn main() {
  let f = File::open("files/day23.txt").expect("File not found.");
  let file = BufReader::new(&f);
  let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

  let regex = Regex::new(r"^pos=<(?P<x>-?\d+),(?P<y>-?\d+),(?P<z>-?\d+)>, r=(?P<r>\d+)$").unwrap();

  let bots: Vec<Bot> = lines
    .iter()
    .map(|l| {
      let caps = regex.captures(l).unwrap();

      Bot {
        x: caps.name("x").unwrap().as_str().parse().unwrap(),
        y: caps.name("y").unwrap().as_str().parse().unwrap(),
        z: caps.name("z").unwrap().as_str().parse().unwrap(),
        r: caps.name("r").unwrap().as_str().parse().unwrap(),
      }
    })
    .collect();

  let strongest = bots
    .iter()
    .max_by(|a, b| (a.r).partial_cmp(&b.r).unwrap_or(Ordering::Equal))
    .unwrap();

  let in_range = bots
    .iter()
    .filter(|b| {
      (strongest.x - b.x).abs() + (strongest.y - b.y).abs() + (strongest.z - b.z).abs()
        <= strongest.r
    })
    .count();

  println!("{}", in_range);

  let mut size = 0;

  for bot in &bots {
    size = max(bot.x.abs(), size);
    size = max(bot.y.abs(), size);
    size = max(bot.z.abs(), size);
  }

  for x in 0.. {
    if 2 << x > size {
      size = 2 << x;
      break;
    }
  }

  let start_bounds = (0, 0, 0, size);
  let mut bounds = vec![start_bounds];

  while bounds.get(0).unwrap().3 > 0 {
    let children: Vec<(i32, i32, i32, i32)> = bounds
      .iter()
      .flat_map(|(x, y, z, r)| {
        let nr = max(r >> 1, 1);

        vec![
          (x + nr, y + nr, z + nr, r >> 1),
          (x + nr, y + nr, z - nr, r >> 1),
          (x + nr, y - nr, z + nr, r >> 1),
          (x + nr, y - nr, z - nr, r >> 1),
          (x - nr, y + nr, z + nr, r >> 1),
          (x - nr, y + nr, z - nr, r >> 1),
          (x - nr, y - nr, z + nr, r >> 1),
          (x - nr, y - nr, z - nr, r >> 1),
        ]
      })
      .collect();

    let mut best_children = Vec::new();
    let mut best_count = 0;

    for child in children {
      let count = &bots
        .iter()
        .filter(|b| {
          let cx = max(min(child.0 + child.3, b.x), child.0 - child.3);
          let cy = max(min(child.1 + child.3, b.y), child.1 - child.3);
          let cz = max(min(child.2 + child.3, b.z), child.2 - child.3);

          ((cx - b.x).abs() + (cy - b.y).abs() + (cz - b.z).abs()) <= b.r
        })
        .count();

      if count > &best_count {
        best_count = *count;
        best_children = vec![child]
      } else if count == &best_count {
        best_children.push(child)
      }

      // println!("{:?}, {}", child, count);
    }

    bounds = best_children;
  }

  let best = bounds
    .iter()
    .map(|(x, y, z, _)| x.abs() + y.abs() + z.abs())
    .min();

  println!("{:?}", best.unwrap());
}
