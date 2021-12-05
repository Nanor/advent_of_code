extern crate regex;

use regex::Regex;
use std::cmp::min;
use std::collections::HashMap;
use std::fs::File;
use std::io::prelude::*;

fn travel(
  r: &str,
  grid: &mut HashMap<(isize, isize), usize>,
  pos: (isize, isize),
) -> (isize, isize) {
  let mut rest = r;

  let mut curr_pos = pos;

  let dirs = Regex::new(r"^([NSEW]+)").unwrap();
  let next = dirs.captures(&rest);
  match next {
    Some(n) => {
      let p = n.get(1).unwrap().as_str();

      curr_pos = add_to_grid(p, grid, pos);

      rest = &rest[p.len()..];
    }
    None => (),
  }
  if rest.len() == 0 {
    return curr_pos;
  }

  let mut depth = 0;

  let mut group_end = rest.len();

  for (i, c) in rest.chars().enumerate() {
    if c == '(' {
      depth += 1
    }
    if c == ')' {
      depth -= 1
    }

    if c == ')' && depth == 0 {
      group_end = i + 1;
      break;
    }
  }

  let after_group = &rest[group_end..];

  depth = 0;
  let mut last_branch = 0;

  let mut new_pos = curr_pos;

  for (i, c) in rest.chars().enumerate() {
    if i == group_end {
      break;
    }

    if c == '(' {
      depth += 1
    }
    if c == ')' {
      depth -= 1
    }

    if (c == '|' && depth == 1) || (c == ')' && depth == 0) {
      let branch = &mut rest[last_branch + 1..i].to_owned();
      new_pos = travel(branch, grid, curr_pos);
      last_branch = i;
    }
  }

  return travel(after_group, grid, new_pos);
}

fn add_to_grid(
  p: &str,
  grid: &mut HashMap<(isize, isize), usize>,
  start: (isize, isize),
) -> (isize, isize) {
  let mut x = start.0;
  let mut y = start.1;

  let mut last_val = *grid.get(&(x, y)).unwrap();

  for c in p.chars() {
    match c {
      'N' => {
        y -= 1;
      }
      'S' => {
        y += 1;
      }
      'E' => {
        x += 1;
      }
      'W' => {
        x -= 1;
      }
      _char => (),
    }

    let curr = grid.get(&(x, y));

    let new;

    if curr.is_some() {
      new = *min(curr.unwrap(), &(last_val + 1));
    } else {
      new = last_val + 1;
    }

    grid.insert((x, y), new);
    last_val = new;
  }

  return (x, y);
}

fn run(input: &str) {
  let rest = input.replace("^", "").replace("$", "");

  let mut grid: HashMap<(isize, isize), usize> = HashMap::new();
  grid.insert((0, 0), 0);

  travel(&rest, &mut grid, (0, 0));

  println!("{}", *grid.values().max().unwrap_or(&0));
  println!("{}", grid.values().filter(|&&x| x >= 1000).count());
}

fn main() {
  let mut f = File::open("files/day20.txt").expect("No such file");
  let mut regex = String::new();
  f.read_to_string(&mut regex).expect("Could not read");

  // run("^WNE$"); // 3
  // run("^ENWWW(NEEE|SSE(EE|N))$"); // 10
  // run("^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$"); // 18
  // run("^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$"); //23
  // run("^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$"); // 31

  run(&regex);
}
