use std::cmp::max;

fn power_level(x: i32, y: i32, serial: i32) -> i32 {
  let rack = x + 10;
  ((rack * y + serial) * rack / 100) % 10 - 5
}

fn main() {
  let serial = 9435;

  let mut coords: Vec<(u32, u32)> = Vec::new();
  for x in 1..=297 {
    for y in 1..=297 {
      coords.push((x, y));
    }
  }

  let largest = coords
    .iter()
    .max_by_key(|&(x, y)| {
      (0..9)
        .map(|i| power_level((x + (i / 3)) as i32, (y + (i % 3)) as i32, serial))
        .sum::<i32>()
    }).unwrap();
  println!("{},{}", largest.0, largest.1);

  let mut coords: Vec<(u32, u32, u32)> = Vec::new();
  for x in 1..=300 {
    for y in 1..=300 {
      for s in 1..=(301 - max(x, y)) {
        coords.push((x, y, s));
      }
    }
  }

  let largest = coords
    .iter()
    .max_by_key(|&(x, y, s)| {
      (0..(s * s))
        .map(|i| power_level((x + (i / s)) as i32, (y + (i % s)) as i32, serial))
        .sum::<i32>()
    }).unwrap();
  println!("{},{},{}", largest.0, largest.1, largest.2);
}
