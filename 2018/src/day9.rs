use std::cell::Cell;
use std::collections::HashMap;

struct Marble {
  next: Cell<usize>,
  prev: Cell<usize>,
}

fn part1(player_count: u32, last_marble: usize) -> u32 {
  let mut players: HashMap<u32, u32> = HashMap::new();
  let mut marbles: Vec<Marble> = Vec::new();

  marbles.push(Marble {
    next: Cell::new(0),
    prev: Cell::new(0),
  });
  let mut current = 0;

  for m in 1..=last_marble {
    if m % 23 == 0 {
      for _ in 0..7 {
        current = marbles[current].prev.get();
      }
      let score = players.entry(m as u32 % player_count).or_insert(0);
      *score += (current + m) as u32;

      let prev = marbles[current].prev.get();
      let next = marbles[current].next.get();

      marbles[prev].next.set(next);
      marbles[next].prev.set(prev);
      current = next;

      marbles.push(Marble {
        next: Cell::new(0),
        prev: Cell::new(0),
      })
    } else {
      current = marbles[current].next.get();

      let next = marbles[current].next.get();
      let prev = current;

      marbles[next].prev.set(m);
      marbles[current].next.set(m);

      let _ = &marbles.push(Marble {
        next: Cell::new(next),
        prev: Cell::new(prev),
      });
      current = m;
    }
  }

  *players.values().max().unwrap_or(&0)
}

fn main() {
  // println!("{}", part1(10, 1618)); //8317
  // println!("{}", part1(13, 7999)); //146373
  // println!("{}", part1(17, 1104)); //2764
  // println!("{}", part1(21, 6111)); //54718
  // println!("{}", part1(30, 5807)); //37305

  println!("{}", part1(465, 71498)); // 383475
  println!("{}", part1(465, 71498 * 100)); // 3148209772
}
