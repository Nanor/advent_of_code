use itertools::Itertools;
use std::fs;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct Point {
    x: u64,
    y: u64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct VLine {
    x: u64,
    min_y: u64,
    max_y: u64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct HLine {
    y: u64,
    min_x: u64,
    max_x: u64,
}

impl Point {
    fn from_line(line: &str) -> Self {
        let mut parts = line.split(',');
        Self {
            x: parts.next().unwrap().parse().unwrap(),
            y: parts.next().unwrap().parse().unwrap(),
        }
    }

    fn area(self: Self, other: &Self) -> u64 {
        (self.x.abs_diff(other.x) + 1) * (self.y.abs_diff(other.y) + 1)
    }
}

pub fn run() {
    let input = fs::read_to_string("../files/2025_09_input.txt").unwrap();
    let tiles: Vec<_> = input.lines().map(Point::from_line).collect();

    println!("{}", part1(&tiles));
    println!("{}", part2(&tiles));
}

fn part1(tiles: &Vec<Point>) -> u64 {
    return tiles
        .iter()
        .combinations(2)
        .map(|tiles| tiles[0].area(tiles[1]))
        .max()
        .unwrap();
}

fn is_inside(v_lines: &Vec<VLine>, h_lines: &Vec<HLine>, p: Point) -> bool {
    return v_lines
        .iter()
        .filter(|l| p.x >= l.x && p.y >= l.min_y && p.y < l.max_y)
        .count()
        % 2
        == 1
        || v_lines
            .iter()
            .any(|l| p.x == l.x && p.y >= l.min_y && p.y <= l.max_y)
        || h_lines
            .iter()
            .any(|l| p.y == l.y && p.x >= l.min_x && p.x <= l.max_x);
}

fn part2(tiles: &Vec<Point>) -> u64 {
    let mut tiles2 = tiles.iter().cycle();
    tiles2.next();

    let mut v_lines: Vec<VLine> = Vec::new();
    let mut h_lines: Vec<HLine> = Vec::new();

    tiles.iter().zip(tiles2).for_each(|(&a, &b)| {
        if a.x == b.x {
            v_lines.push(VLine {
                x: a.x,
                min_y: if a.y < b.y { a.y } else { b.y },
                max_y: if a.y < b.y { b.y } else { a.y },
            })
        } else if a.y == b.y {
            h_lines.push(HLine {
                y: a.y,
                min_x: if a.x < b.x { a.x } else { b.x },
                max_x: if a.x < b.x { b.x } else { a.x },
            })
        }
    });

    let maxes = tiles
        .iter()
        .combinations(2)
        .sorted_by_key(|tiles| u64::MAX - tiles[0].area(tiles[1]))
        .find(|ts| {
            let &a = ts[0];
            let &b = ts[1];

            let min_x = a.x.min(b.x);
            let max_x = a.x.max(b.x);
            let min_y = a.y.min(b.y);
            let max_y = a.y.max(b.y);

            for x in min_x / 7000 + 1..max_x / 7000 {
                for y in min_y / 7000 + 1..max_y / 7000 {
                    if !is_inside(
                        &v_lines,
                        &h_lines,
                        Point {
                            x: x * 7000,
                            y: y * 7000,
                        },
                    ) {
                        return false;
                    }
                }
            }

            for t in tiles {
                for x in (t.x - 1)..(t.x + 3) {
                    for y in (t.y - 1)..(t.y + 3) {
                        if x >= min_x && x <= max_x && y >= min_y && y <= max_y {
                            if !is_inside(&v_lines, &h_lines, Point { x, y }) {
                                return false;
                            }
                        }
                    }
                }
            }

            return true;
        })
        .unwrap();

    return maxes[0].area(maxes[1]);
}
