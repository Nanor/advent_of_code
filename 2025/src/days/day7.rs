use std::{
    collections::{HashMap, HashSet},
    fs,
    hash::Hash,
    vec,
};

#[derive(Eq, Hash, PartialEq, Debug, Copy, Clone)]
struct Point {
    x: usize,
    y: usize,
}

#[derive(Debug)]
struct Diagram {
    start: Point,
    splitters: HashSet<Point>,
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_07_input.txt").unwrap();
    let diagram = parse(&input);

    let (split_count, timeline_count) = solve(&diagram);
    println!("{}", split_count);
    println!("{}", timeline_count);
}

fn parse(input: &str) -> Diagram {
    let mut start = Point { x: 0, y: 0 };
    let mut splitters: HashSet<Point> = HashSet::new();

    for (y, line) in input.lines().enumerate() {
        for (x, c) in line.chars().enumerate() {
            match c {
                'S' => start = Point { x, y },
                '^' => {
                    splitters.insert(Point { x, y });
                }
                _ => (),
            }
        }
    }

    return Diagram { start, splitters };
}

fn solve(diagram: &Diagram) -> (u64, u64) {
    let mut split_count = 0;
    let mut timeline_count = 0;

    let mut beams: Vec<Point> = vec![diagram.start];

    let mut lines: HashMap<Point, u64> = HashMap::new();
    lines.insert(diagram.start, 1);

    let max_y = diagram.splitters.iter().map(|s| s.y).max().unwrap_or(0);

    while !beams.is_empty() {
        let beam = beams.remove(0);

        let &curr_lines = lines.get(&beam).unwrap_or(&0);

        if beam.y > max_y {
            timeline_count += curr_lines;
            continue;
        }

        let mut propagate = |next: Point| {
            if !lines.contains_key(&next) {
                beams.push(next);
            }

            let &v = lines.get(&next).unwrap_or(&0);
            lines.insert(next, v + curr_lines);
        };

        if diagram.splitters.contains(&Point {
            x: beam.x,
            y: beam.y + 1,
        }) {
            split_count += 1;

            propagate(Point {
                x: beam.x - 1,
                y: beam.y + 1,
            });
            propagate(Point {
                x: beam.x + 1,
                y: beam.y + 1,
            });
        } else {
            propagate(Point {
                x: beam.x,
                y: beam.y + 1,
            });
        }
    }

    return (split_count, timeline_count);
}
