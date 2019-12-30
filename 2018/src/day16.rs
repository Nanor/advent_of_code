extern crate regex;

use regex::Regex;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::str::FromStr;

#[derive(Debug)]
struct Instruction {
  op: usize,
  in1: usize,
  in2: usize,
  out: usize,
}
impl Instruction {
  fn new(codes: Vec<usize>) -> Instruction {
    Instruction {
      op: *codes.get(0).unwrap(),
      in1: *codes.get(1).unwrap(),
      in2: *codes.get(2).unwrap(),
      out: *codes.get(3).unwrap(),
    }
  }

  fn calc(&self, op: &str, registers: &Vec<usize>) -> Vec<usize> {
    let r1 = registers.get(self.in1).unwrap();
    let r2 = registers.get(self.in2).unwrap();

    let v1 = self.in1;
    let v2 = self.in2;

    let res = match op {
      "addr" => r1 + r2,
      "addi" => r1 + v2,
      "mulr" => r1 * r2,
      "muli" => r1 * v2,
      "banr" => r1 & r2,
      "bani" => r1 & v2,
      "borr" => r1 | r2,
      "bori" => r1 | v2,
      "setr" => *r1,
      "seti" => v1,
      "gtir" => {
        if v1 > *r2 {
          1
        } else {
          0
        }
      }
      "gtri" => {
        if *r1 > v2 {
          1
        } else {
          0
        }
      }
      "gtrr" => {
        if r1 > r2 {
          1
        } else {
          0
        }
      }
      "eqir" => {
        if v1 == *r2 {
          1
        } else {
          0
        }
      }
      "eqri" => {
        if *r1 == v2 {
          1
        } else {
          0
        }
      }
      "eqrr" => {
        if r1 == r2 {
          1
        } else {
          0
        }
      }
      &_ => 0,
    };

    return registers
      .iter()
      .enumerate()
      .map(|(i, x)| if i == self.out { res } else { *x })
      .collect();
  }
}

const OPS: [&str; 16] = [
  "addr", "addi", "mulr", "muli", "banr", "bani", "borr", "bori", "setr", "seti", "gtir", "gtri",
  "gtrr", "eqir", "eqri", "eqrr",
];

#[derive(Debug)]
struct Sample {
  before: Vec<usize>,
  after: Vec<usize>,
  instruction: Instruction,
}
impl Sample {
  fn test(&self) -> Vec<&str> {
    return OPS
      .iter()
      .filter(|op| self.instruction.calc(op, &self.before) == self.after)
      .map(|s| *s)
      .collect();
  }
}

fn main() {
  let f = File::open("files/day16.txt").expect("File not found.");
  let file = BufReader::new(&f);
  let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

  let mut samples: Vec<Sample> = Vec::new();

  let before_test = Regex::new(r"Before: \[\d+, \d+, \d+, \d+]").unwrap();
  let numbers = Regex::new(r"(\d+).*(\d+).*(\d+).*(\d+)").unwrap();

  let mut last_sample = 0;

  for index in 0..lines.len() {
    if before_test.is_match(lines.get(index).unwrap()) {
      last_sample = index + 4;
      let before_caps = numbers.captures(lines.get(index).unwrap()).unwrap();
      let befores: Vec<usize> = (1..=4)
        .map(|i| {
          before_caps
            .get(i)
            .map_or(0, |m| usize::from_str(m.as_str()).unwrap())
        })
        .collect();
      let after_caps = numbers.captures(lines.get(index + 2).unwrap()).unwrap();
      let afters: Vec<usize> = (1..=4)
        .map(|i| {
          after_caps
            .get(i)
            .map_or(0, |m| usize::from_str(m.as_str()).unwrap())
        })
        .collect();
      let inst_caps = numbers.captures(lines.get(index + 1).unwrap()).unwrap();
      let inst: Vec<usize> = (1..=4)
        .map(|i| {
          inst_caps
            .get(i)
            .map_or(0, |m| usize::from_str(m.as_str()).unwrap())
        })
        .collect();

      let sample = Sample {
        before: befores,
        after: afters,
        instruction: Instruction::new(inst),
      };

      &samples.push(sample);
    }
  }

  let three_ops = samples
    .iter()
    .filter(|s| s.test().len() >= 3)
    .collect::<Vec<&Sample>>()
    .len();

  println!("{}", three_ops);

  let mut options: Vec<Vec<&str>> = Vec::new();
  for code in 0..=15 {
    let valids: Vec<&str> = samples.iter().filter(|s| s.instruction.op == code).fold(
      OPS.to_vec(),
      |ops: Vec<&str>, s| {
        let v = s.test();
        return ops.into_iter().filter(|o| v.contains(o)).collect();
      },
    );
    options.insert(code, valids);
  }

  let mut op_codes: [&str; 16] = [""; 16];

  for _ in 0..16 {
    for (code, option) in options.iter().enumerate() {
      if option.len() == 1 {
        op_codes[code] = option.get(0).unwrap();
      }
    }

    options = options
      .into_iter()
      .map(|ops| {
        ops
          .into_iter()
          .filter(|o| !op_codes.to_vec().contains(o))
          .collect()
      })
      .collect();

    if (0..16).all(|c| op_codes[c] != "") {
      break;
    };
  }

  let mut registers: Vec<usize> = vec![0, 0, 0, 0];

  for index in last_sample..lines.len() {
    let line = lines.get(index).unwrap();

    if line.len() > 0 {
      let instruction = Instruction::new(
        line
          .split(" ")
          .map(|c| usize::from_str(c).unwrap())
          .collect(),
      );
      registers = instruction.calc(op_codes[instruction.op], &registers);
    }
  }
  println!("{}", registers.get(0).unwrap());
}
