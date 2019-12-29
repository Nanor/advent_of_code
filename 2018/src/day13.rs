use std::cell::Cell;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

struct Cart {
  x: usize,
  y: usize,
  dir: u8,
  count: u8,
  crashed: Cell<bool>,
}
impl Cart {
  fn new(x: usize, y: usize, c: char) -> Cart {
    Cart {
      x: x,
      y: y,
      dir: match c {
        '^' => 0,
        '>' => 1,
        'v' => 2,
        '<' => 3,
        _ => 0,
      },
      count: 0,
      crashed: Cell::new(false),
    }
  }
  fn update(&self, tracks: &HashMap<(usize, usize), char>) -> Cart {
    let mut x = self.x;
    let mut y = self.y;
    let mut dir = self.dir;
    let mut count = self.count;
    match dir {
      0 => y -= 1,
      1 => x += 1,
      2 => y += 1,
      3 => x -= 1,
      _ => {}
    };

    let track = *tracks.get(&(x, y)).unwrap();
    dir = match track {
      '\\' => 3 - dir,
      '/' => {
        if dir % 2 == 0 {
          dir + 1
        } else {
          dir - 1
        }
      }
      '+' => {
        count = (count + 1) % 3;
        match count {
          1 => (dir + 3) % 4,
          0 => (dir + 1) % 4,
          _ => dir,
        }
      }
      _ => dir,
    };

    Cart {
      x: x,
      y: y,
      dir: dir,
      count: count,
      crashed: Cell::new(self.crashed.get()),
    }
  }

  fn crash(&self) {
    self.crashed.set(true);
  }
}

#[allow(dead_code)]
fn draw(tracks: &HashMap<(usize, usize), char>, carts: &Vec<Cart>) {
  let width = *tracks.keys().map(|(x, _)| x).max().unwrap() as u32;
  let height = *tracks.keys().map(|(_, y)| y).max().unwrap() as u32;

  for y in 0..=height {
    for x in 0..=width {
      let m = carts
        .iter()
        .filter(|c| x == c.x as u32 && y == c.y as u32 && !c.crashed.get())
        .next();
      match m {
        Some(c) => {
          match c.dir {
            0 => print!("^"),
            1 => print!(">"),
            2 => print!("v"),
            3 => print!("<"),
            _ => {}
          }
          continue;
        }
        None => {}
      }

      let m = tracks.get(&(x as usize, y as usize));
      match m {
        Some(c) => print!("{}", c),
        None => print!(" "),
      }
    }
    println!("");
  }
  println!("");
}

fn main() {
  let f = File::open("files/day13.txt").expect("File not found.");
  let file = BufReader::new(&f);

  let mut tracks: HashMap<(usize, usize), char> = HashMap::new();
  let mut carts: Vec<Cart> = Vec::new();

  let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();
  for (y, line) in lines.iter().enumerate() {
    for (x, c) in line.chars().enumerate() {
      if c == '<' || c == '>' || c == 'v' || c == '^' {
        let cart = Cart::new(x, y, c);
        if cart.dir % 2 == 0 {
          tracks.insert((x, y), '|');
        } else {
          tracks.insert((x, y), '-');
        }
        carts.push(cart);
      } else if c != ' ' {
        tracks.insert((x, y), c);
      }
    }
  }

  // draw(&tracks, &carts);

  loop {
    carts.sort_by_key(|c| c.y * 1000 + c.x);
    for n in 0..carts.len() {
      if carts[n].crashed.get() {
        continue;
      }
      carts[n] = carts[n].update(&tracks);

      let m = carts
        .iter()
        .enumerate()
        .filter(|&(m, c)| n != m && !c.crashed.get() && carts[n].x == c.x && carts[n].y == c.y)
        .next();
      match m {
        Some((_, c)) => {
          println!("Crash: {},{}", carts[n].x, carts[n].y);

          carts[n].crash();
          c.crash();
        }
        None => {}
      }
    }
    // draw(&tracks, &carts);
    if carts.iter().filter(|c| !c.crashed.get()).count() == 1 {
      let cart = carts.iter().filter(|c| !c.crashed.get()).next().unwrap();
      println!("End:   {},{}", cart.x, cart.y);
      break;
    }
  }
}
