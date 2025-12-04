use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};

struct Inst<'a> {
    op: &'a str,
    in1: usize,
    in2: usize,
    out: usize,
}

fn calc(l: &Inst, registers: &mut Vec<usize>) {
    let r1 = registers.get(l.in1).unwrap_or(&0);
    let r2 = registers.get(l.in2).unwrap_or(&0);

    let v1 = l.in1;
    let v2 = l.in2;

    let res = match l.op {
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
        "gtir" => (v1 > *r2) as usize,
        "gtri" => (*r1 > v2) as usize,
        "gtrr" => (r1 > r2) as usize,
        "eqir" => (v1 == *r2) as usize,
        "eqri" => (*r1 == v2) as usize,
        "eqrr" => (r1 == r2) as usize,
        &_ => 0,
    };

    registers[l.out] = res;
}

pub(crate) fn main() {
    let f = File::open("../files/2018_21_input.txt").expect("File not found.");
    let file = BufReader::new(&f);
    let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

    let ip_registers: Vec<&str> = lines.get(0).unwrap().split(' ').collect();
    let ip_register = ip_registers.get(1).unwrap().parse::<usize>().unwrap();

    let insts: Vec<Inst> = lines[1..]
        .iter()
        .map(|l| {
            let line: Vec<&str> = l.split(' ').collect();

            let op = line.get(0).unwrap();
            let in1 = line.get(1).unwrap().parse::<usize>().unwrap();
            let in2 = line.get(2).unwrap().parse::<usize>().unwrap();
            let out = line.get(3).unwrap().parse::<usize>().unwrap();

            return Inst { op, in1, in2, out };
        })
        .collect();

    run(&insts, ip_register);
}

fn run(lines: &Vec<Inst>, ip_register: usize) {
    let mut ip: usize = 0;
    let mut registers = vec![0, 0, 0, 0, 0, 0];

    let mut seen: HashSet<usize> = HashSet::new();
    let mut timeout = 0;
    let mut last = 0;

    loop {
        registers[ip_register] = ip;

        match lines.get(ip) {
            Some(l) => {
                if ip == 29 {
                    let val = registers.get(5).unwrap();

                    if !seen.contains(val) {
                        timeout = 0;
                        if last == 0 {
                            println!("{}", val);
                        }
                        last = *val;
                    }
                    seen.insert(*val);
                }

                calc(l, &mut registers);

                ip = registers[ip_register] + 1;
                timeout += 1;

                if timeout > 999999 {
                    break;
                }
            }
            None => break,
        }
    }

    println!("{}", last);
}
