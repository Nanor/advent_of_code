extern crate regex;

use regex::Regex;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;

#[derive(Debug)]
struct Light {
  x: i32,
  y: i32,
  dx: i32,
  dy: i32,
}

fn draw(lights: &Vec<Light>) {
  let min_x = lights.iter().map(|l| l.x).min().unwrap();
  let max_x = lights.iter().map(|l| l.x).max().unwrap();
  let min_y = lights.iter().map(|l| l.y).min().unwrap();
  let max_y = lights.iter().map(|l| l.y).max().unwrap();

  for y in min_y..=max_y {
    for x in min_x..=max_x {
      let m = lights.iter().filter(|l| l.x == x && l.y == y).next();
      match m {
        Some(_) => print!("#"),
        None => print!("."),
      }
    }
    print!("\n");
  }
}

fn update(light: &Light) -> Light {
  Light {
    x: light.x + light.dx,
    y: light.y + light.dy,
    dx: light.dx,
    dy: light.dy,
  }
}

fn main() {
  let f = File::open("files/day10.txt").expect("File not found.");
  let file = BufReader::new(&f);

  let re = Regex::new(r"position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>").unwrap();
  let mut lights: Vec<Light> = file
    .lines()
    .filter_map(|line| line.ok())
    .map(|line| {
      let m = re.captures(line.as_str()).unwrap();
      Light {
        x: m.get(1).unwrap().as_str().parse().unwrap(),
        y: m.get(2).unwrap().as_str().parse().unwrap(),
        dx: m.get(3).unwrap().as_str().parse().unwrap(),
        dy: m.get(4).unwrap().as_str().parse().unwrap(),
      }
    }).collect();

  let mut timer = 0;
  loop {
    let new_lights: Vec<Light> = lights.iter().map(|l| update(l)).collect();

    if new_lights.iter().map(|l| l.x).max().unwrap() - new_lights.iter().map(|l| l.x).min().unwrap()
      > lights.iter().map(|l| l.x).max().unwrap() - lights.iter().map(|l| l.x).min().unwrap()
    {
      break;
    }

    lights = new_lights;
    timer += 1;
  }

  draw(&lights);
  println!("{}", timer);
}
