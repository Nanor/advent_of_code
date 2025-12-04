use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use pathfinding::prelude::astar;
use regex::Regex;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

pub(crate) fn main() {
    let f = File::open("../files/2018_22_input.txt").expect("File not found.");
    let file = BufReader::new(&f);
    let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

    let depth_regex = Regex::new(r"^depth: (?P<depth>\d+)$").unwrap();
    let target_regex = Regex::new(r"^target: (?P<x>\d+),(?P<y>\d+)$").unwrap();

    let depth_cap = depth_regex.captures(lines.get(0).unwrap()).unwrap();
    let target_caps = target_regex.captures(lines.get(1).unwrap()).unwrap();

    let depth: i32 = depth_cap.name("depth").unwrap().as_str().parse().unwrap();
    let x: i32 = target_caps.name("x").unwrap().as_str().parse().unwrap();
    let y: i32 = target_caps.name("y").unwrap().as_str().parse().unwrap();

    // run(510, 10, 10);
    run(depth, x, y);
}

#[derive(FromPrimitive, Debug, PartialEq, Eq)]
enum RegionType {
    Rocky = 0,
    Wet = 1,
    Narrow = 2,
    Wall = 3,
}

fn run(depth: i32, target_x: i32, target_y: i32) {
    let mut geo_index: HashMap<(i32, i32), i32> = HashMap::new();
    let mut erosion: HashMap<(i32, i32), i32> = HashMap::new();
    let mut region_types: HashMap<(i32, i32), RegionType> = HashMap::new();

    let modulo = 20183;

    let mut risk = 0;

    for y in 0..=target_y * 10 {
        for x in 0..=target_x * 10 {
            let geo: i32;

            if y == 0 {
                geo = x * 16807;
            } else if x == 0 {
                geo = y * 48271;
            } else if x == target_x && y == target_y {
                geo = 0;
            } else {
                let left = erosion.get(&(x - 1, y)).unwrap_or(&0);
                let up = erosion.get(&(x, y - 1)).unwrap_or(&0);

                geo = left * up;
            }

            let ero = (geo + depth) % modulo;
            let region_type = ero % 3;

            geo_index.insert((x, y), geo);
            erosion.insert((x, y), ero);
            region_types.insert((x, y), FromPrimitive::from_i32(region_type).unwrap());

            if x <= target_x && y <= target_y {
                risk += region_type;
            }
        }
    }

    println!("{}", risk);

    let start = State {
        x: 0,
        y: 0,
        tool: Tool::Torch,
    };

    let goal = State {
        x: target_x,
        y: target_y,
        tool: Tool::Torch,
    };

    let result = astar(
        &start,
        |p| p.successors(&region_types),
        |p| p.distance(&goal),
        |p| *p == goal,
    );

    // println!("{:?}", result);
    println!("{:?}", result.unwrap().1);
}

#[derive(PartialEq, Debug, Clone, Eq, Hash, Copy)]
enum Tool {
    Torch,
    Climbing,
    Neither,
}

#[derive(PartialEq, Debug, Clone, Eq, Hash)]
struct State {
    x: i32,
    y: i32,
    tool: Tool,
}

fn can_travel(r: &RegionType, tool: &Tool) -> bool {
    (tool == &Tool::Climbing && (r == &RegionType::Rocky || r == &RegionType::Wet))
        || (tool == &Tool::Torch && (r == &RegionType::Rocky || r == &RegionType::Narrow))
        || (tool == &Tool::Neither && (r == &RegionType::Wet || r == &RegionType::Narrow))
}

impl State {
    fn distance(&self, other: &State) -> i32 {
        return (self.x - other.x).abs()
            + (self.y - other.y).abs()
            + if self.tool == other.tool { 7 } else { 0 };
    }

    fn successors(&self, regions: &HashMap<(i32, i32), RegionType>) -> Vec<(State, i32)> {
        let &State { x, y, tool } = self;

        let mut out: Vec<(State, i32)> = Vec::new();
        if x > 0 && can_travel(regions.get(&(x - 1, y)).unwrap_or(&RegionType::Wall), &tool) {
            out.push((State { x: x - 1, y, tool }, 1))
        };
        if y > 0 && can_travel(regions.get(&(x, y - 1)).unwrap_or(&RegionType::Wall), &tool) {
            out.push((State { x, y: y - 1, tool }, 1))
        };
        if can_travel(regions.get(&(x + 1, y)).unwrap_or(&RegionType::Wall), &tool) {
            out.push((State { x: x + 1, y, tool }, 1));
        }
        if can_travel(regions.get(&(x, y + 1)).unwrap_or(&RegionType::Wall), &tool) {
            out.push((State { x, y: y + 1, tool }, 1));
        }

        let r = regions.get(&(x, y)).unwrap_or(&RegionType::Wall);

        if tool != Tool::Climbing && can_travel(r, &Tool::Climbing) {
            out.push((
                State {
                    x,
                    y,
                    tool: Tool::Climbing,
                },
                7,
            ));
        }

        if tool != Tool::Torch && can_travel(r, &Tool::Torch) {
            out.push((
                State {
                    x,
                    y,
                    tool: Tool::Torch,
                },
                7,
            ));
        }
        if tool != Tool::Neither && can_travel(r, &Tool::Neither) {
            out.push((
                State {
                    x,
                    y,
                    tool: Tool::Neither,
                },
                7,
            ));
        }

        return out;
    }
}
