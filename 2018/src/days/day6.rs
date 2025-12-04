use std::collections::{HashMap, HashSet};
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug, Hash)]
struct Point {
    x: i32,
    y: i32,
}
impl PartialEq for Point {
    fn eq(&self, other: &Point) -> bool {
        self.x == other.x && self.y == other.y
    }
}
impl Eq for Point {}
impl Point {
    fn new(x: i32, y: i32) -> Point {
        Point { x: x, y: y }
    }
    fn distance(&self, other: &Point) -> i32 {
        (self.x - other.x).abs() + (self.y - other.y).abs()
    }
}

fn closest_point<'a>(point: &Point, points: &'a Vec<Point>) -> Option<&'a Point> {
    let mut dists: Vec<i32> = points.iter().map(|p| point.distance(p)).collect();
    dists.sort();
    if dists[0] == dists[1] {
        return None;
    }
    points.iter().min_by_key(|p| point.distance(p))
}

pub(crate) fn main() {
    let f = File::open("../files/2018_06_input.txt").expect("File not found.");
    let file = BufReader::new(&f);
    let points: Vec<Point> = file
        .lines()
        .filter_map(|line| line.ok())
        .map(|line| {
            let coords: Vec<&str> = line.split(", ").collect();
            Point::new(coords[0].parse().unwrap(), coords[1].parse().unwrap())
        })
        .collect();

    let mut grid: HashMap<Point, Option<&Point>> = HashMap::new();
    let width = points.iter().map(|p| p.x).max().unwrap() + 1;
    let height = points.iter().map(|p| p.y).max().unwrap() + 1;

    for x in 0..width {
        for y in 0..height {
            let p = Point::new(x, y);
            let closest = closest_point(&p, &points);
            grid.insert(p, closest);
        }
    }

    let mut edges: HashSet<Option<&Point>> = HashSet::new();
    for x in 0..width {
        edges.insert(*grid.get(&Point::new(x, 0)).unwrap());
        edges.insert(*grid.get(&Point::new(x, height - 1)).unwrap());
    }
    for y in 0..height {
        edges.insert(*grid.get(&Point::new(0, y)).unwrap());
        edges.insert(*grid.get(&Point::new(width - 1, y)).unwrap());
    }
    let edges: Vec<&Point> = edges
        .iter()
        .filter(|v| !v.is_none())
        .map(|v| v.unwrap())
        .collect();

    let largest_area = points
        .iter()
        .filter(|p| !edges.contains(p))
        .map(|p| grid.values().filter(|p2| Some(p) == **p2).count())
        .max()
        .unwrap();
    println!("{}", largest_area);

    let mut all_points: Vec<Point> = Vec::new();
    for x in 0..width {
        for y in 0..height {
            all_points.push(Point::new(x, y))
        }
    }

    let region = &all_points
        .iter()
        .filter(|p| {
            let total: i32 = points.iter().map(|p2| p.distance(p2)).sum();
            total < 10000
        })
        .count();
    println!("{}", region);
}
