extern crate regex;

use std::fs::File;
use std::io::{BufRead, BufReader};

fn calc(op: &str, in1: usize, in2: usize, out: usize, registers: &mut Vec<usize>) {
  let r1 = registers.get(in1).unwrap_or(&0);
  let r2 = registers.get(in2).unwrap_or(&0);

  let v1 = in1;
  let v2 = in2;

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

  registers[out] = res;
}

fn main() {
  let f = File::open("files/day19.txt").expect("File not found.");
  let file = BufReader::new(&f);
  let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

  let ip_registers: Vec<&str> = lines.get(0).unwrap().split(' ').collect();
  let ip_register = ip_registers.get(1).unwrap().parse::<usize>().unwrap();

  run(&lines, ip_register, 0);
  run(&lines, ip_register, 1);
}

fn run(lines: &Vec<String>, ip_register: usize, init: usize) {
  let mut ip: usize = 0;
  let mut registers = vec![init, 0, 0, 0, 0, 0];

  loop {
    registers[ip_register] = ip;

    match lines.get(ip + 1) {
      Some(l) => {
        let line: Vec<&str> = l.split(' ').collect();

        let op = line.get(0).unwrap();
        let in1 = line.get(1).unwrap().parse::<usize>().unwrap();
        let in2 = line.get(2).unwrap().parse::<usize>().unwrap();
        let out = line.get(3).unwrap().parse::<usize>().unwrap();

        print!("ip={:02} ", ip);
        print!("{:?} ", registers);
        print!("{} {} {} {} ", op, in1, in2, out);

        calc(op, in1, in2, out, &mut registers);

        println!("{:?}", registers);
        ip = registers[ip_register] + 1;
      }
      None => break,
    }
  }

  println!("{}", registers.get(0).unwrap());
}
