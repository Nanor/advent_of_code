use std::fs::File;
use std::io::prelude::*;

fn reduce(p: &str) -> usize {
  let mut polymer = String::from(p);
  let pairs: [&str; 52] = [
    "Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh", "Ii", "Jj", "Kk", "Ll", "Mm", "Nn", "Oo", "Pp",
    "Qq", "Rr", "Ss", "Tt", "Uu", "Vv", "Ww", "Xx", "Yy", "Zz", "aA", "bB", "cC", "dD", "eE", "fF",
    "gG", "hH", "iI", "jJ", "kK", "lL", "mM", "nN", "oO", "pP", "qQ", "rR", "sS", "tT", "uU", "vV",
    "wW", "xX", "yY", "zZ",
  ];

  let mut len;
  loop {
    len = polymer.len();
    for pair in pairs.iter() {
      polymer = polymer.replace(pair, "");
    }
    if len == polymer.len() {
      break;
    }
  }

  return len;
}

fn main() {
  let mut f = File::open("files/day5.txt").expect("No such file");
  let mut polymer = String::new();
  f.read_to_string(&mut polymer).expect("Could not read");

  println!("{}", reduce(&polymer));

  let alphabet: [(&str, &str); 26] = [
    ("a", "A"),
    ("b", "B"),
    ("c", "C"),
    ("d", "D"),
    ("e", "E"),
    ("f", "F"),
    ("g", "G"),
    ("h", "H"),
    ("i", "I"),
    ("j", "J"),
    ("k", "K"),
    ("l", "L"),
    ("m", "M"),
    ("n", "N"),
    ("o", "O"),
    ("p", "P"),
    ("q", "Q"),
    ("r", "R"),
    ("s", "S"),
    ("t", "T"),
    ("u", "U"),
    ("v", "V"),
    ("w", "W"),
    ("x", "X"),
    ("y", "Y"),
    ("z", "Z"),
  ];
  let min_polymer = alphabet
    .iter()
    .map(|(lower, upper)| {
      let p = polymer.replace(lower, "").replace(upper, "");
      reduce(&p)
    }).min();

  println!("{}", min_polymer.expect("No min"));
}
