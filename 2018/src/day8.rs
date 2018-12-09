use std::fs::File;
use std::io::prelude::*;

#[derive(Debug)]
struct Node {
  nodes: Vec<Node>,
  metadata: Vec<u32>,
}
impl Node {
  fn from_input(input: &[u32]) -> Node {
    Node::from_input_inner(input).0
  }

  fn from_input_inner<'a>(input: &'a [u32]) -> (Node, &'a [u32]) {
    let node_count: usize = input[0] as usize;
    let metadata_count: usize = input[1] as usize;
    let mut input: &[u32] = &input[2..];
    let mut nodes: Vec<Node> = Vec::new();
    for _ in 0..node_count {
      let res = Node::from_input_inner(&input);
      nodes.push(res.0);
      input = res.1;
    }
    let metadata: Vec<u32> = input[0..metadata_count].to_vec();

    (
      Node {
        nodes: nodes,
        metadata: metadata,
      },
      &input[metadata_count..],
    )
  }
}

fn part1(node: &Node) -> u32 {
  let nodes: u32 = node.nodes.iter().map(|n| part1(n)).sum();
  let metadata: u32 = node.metadata.iter().sum();
  nodes + metadata
}

fn part2(node: &Node) -> u32 {
  if node.nodes.is_empty() {
    return node.metadata.iter().sum();
  }
  node
    .metadata
    .iter()
    .map(|&m| {
      if m == 0 || m as usize > node.nodes.len() {
        return 0;
      }
      part2(&node.nodes[(m - 1) as usize])
    }).sum()
}

fn main() {
  let mut f = File::open("files/day8.txt").expect("No such file");
  let mut input = String::new();
  f.read_to_string(&mut input).expect("Could not read");
  let input: Vec<u32> = input.split(" ").map(|x| x.parse().unwrap()).collect();

  let root: Node = Node::from_input(&input);
  println!("{}", part1(&root));
  println!("{}", part2(&root));
}
