use std::convert::TryInto;
use std::fs::File;
use std::io::{BufRead, BufReader};

type Point = [i32; 4];

fn distance(a: Point, b: Point) -> i32 {
  (a[0] - b[0]).abs() + (a[1] - b[1]).abs() + (a[2] - b[2]).abs() + (a[3] - b[3]).abs()
}

fn part1() {
  let f = File::open("files/day25.txt").expect("File not found.");
  let file = BufReader::new(&f);
  let points: Vec<Point> = file
    .lines()
    .filter_map(|line| line.ok())
    .map(|l| {
      l.split(',')
        .map(|p| p.parse().unwrap())
        .collect::<Vec<i32>>()
        .try_into()
        .unwrap()
    })
    .collect();

  let mut groups: Vec<Vec<Point>> = Vec::new();

  for point in points {
    let mut to_merge: Vec<usize> = Vec::new();

    for (i, group) in groups.iter().enumerate() {
      for p in group {
        if distance(point, *p) <= 3 {
          to_merge.push(i);
          break;
        }
      }
    }

    let mut merged = vec![point];
    for i in to_merge {
      merged.append(groups.get_mut(i).unwrap())
    }

    groups.push(merged);

    groups = groups.into_iter().filter(|v| v.len() > 0).collect();
  }

  println!("{}", groups.len());
}

fn main() {
  part1();
}
