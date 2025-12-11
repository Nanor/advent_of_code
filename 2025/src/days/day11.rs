use std::{collections::HashMap, fs};

pub fn run() {
    let input = fs::read_to_string("../files/2025_11_input.txt").unwrap();
    let _input = "aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out";

    let mut nodes: HashMap<&str, Vec<&str>> = HashMap::new();
    for line in input.lines() {
        let mut parts = line.split(": ");
        let id = parts.next().unwrap();
        let conns: Vec<_> = parts.next().unwrap().split_whitespace().collect();

        nodes.insert(id, conns);
    }

    let part1 = get_path_count(&nodes, "you", "out");

    println!("{}", part1);

    let path_a = get_path_count(&nodes, "svr", "fft")
        * get_path_count(&nodes, "fft", "dac")
        * get_path_count(&nodes, "dac", "out");
    let path_b = get_path_count(&nodes, "svr", "dac")
        * get_path_count(&nodes, "dac", "fft")
        * get_path_count(&nodes, "fft", "out");
    let part2 = path_a + path_b;

    println!("{}", part2);
}

fn get_path_count(nodes: &HashMap<&str, Vec<&str>>, start: &str, end: &str) -> u64 {
    let mut paths: HashMap<&str, u64> = HashMap::new();

    paths.insert("out", 0);
    paths.insert(end, 1);

    loop {
        for &node in nodes.keys() {
            if paths.contains_key(node) {
                continue;
            }
            if nodes[&node].iter().all(|x| paths.contains_key(x)) {
                let count = nodes[&node].iter().map(|x| paths[x]).sum();
                paths.insert(&node, count);
            }
        }

        if paths.contains_key(start) {
            break;
        }
    }

    return paths[start];
}
