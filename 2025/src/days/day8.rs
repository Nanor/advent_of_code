use itertools::Itertools;
use std::{collections::HashMap, fs, i64};

#[derive(Clone, Copy)]
struct Point {
    x: i64,
    y: i64,
    z: i64,
    index: usize,
}

impl Point {
    fn from_line((index, line): (usize, &str)) -> Self {
        let mut parts = line.split(',');
        Self {
            x: parts.next().unwrap().parse().unwrap(),
            y: parts.next().unwrap().parse().unwrap(),
            z: parts.next().unwrap().parse().unwrap(),
            index,
        }
    }

    fn sqr_dist(self: &Self, other: &Point) -> i64 {
        (self.x - other.x).pow(2) + (self.y - other.y).pow(2) + (self.z - other.z).pow(2)
    }
}

struct Pair {
    a: Point,
    b: Point,
    sqr_dist: i64,
}

impl Pair {
    fn new(a: Point, b: Point) -> Self {
        Self {
            a,
            b,
            sqr_dist: a.sqr_dist(&b),
        }
    }
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_08_input.txt").unwrap();
    let boxes: Vec<_> = input.lines().enumerate().map(Point::from_line).collect();

    let mut groups: HashMap<usize, usize> = HashMap::new();
    (0..boxes.len()).for_each(|b| {
        groups.insert(b, b);
    });

    let mut pairs: Vec<_> = (boxes.iter().combinations(2))
        .map(|bs| Pair::new(*bs[0], *bs[1]))
        .collect();
    pairs.sort_by_key(|p| p.sqr_dist);

    for (connection, pair) in pairs.iter().enumerate() {
        let box_a = pair.a;
        let box_b = pair.b;

        let new_group = groups[&box_a.index];
        let old_group = groups[&box_b.index];

        if new_group != old_group {
            (0..boxes.len()).for_each(|b| {
                if groups[&b] == old_group {
                    groups.insert(b, new_group);
                }
            })
        }

        if connection == 1000 {
            let mut group_sizes: Vec<_> = (0..boxes.len())
                .map(|g| groups.values().filter(|&&g2| g == g2).count())
                .collect();

            group_sizes.sort_by(|a, b| (b).cmp(a));
            println!("{}", group_sizes[0..3].iter().product::<usize>());
        }

        if groups.values().all(|&b| b == new_group) {
            println!("{}", box_a.x * box_b.x);
            return;
        };
    }
}
