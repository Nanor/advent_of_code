use pathfinding::directed::dijkstra::{dijkstra, dijkstra_all};
use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug, Copy, Clone)]
struct Unit {
    x: usize,
    y: usize,
    team: bool,
    health: u8,
    attack: u8,
}
impl Unit {
    fn new(x: usize, y: usize, team: char, attack: u8) -> Unit {
        Unit {
            x: x,
            y: y,
            team: team == 'E',
            health: 200,
            attack: attack,
        }
    }

    fn update(&self, x: usize, y: usize) -> Unit {
        Unit {
            x: x,
            y: y,
            team: self.team,
            health: self.health,
            attack: self.attack,
        }
    }

    fn damage(&self, dmg: u8) -> Unit {
        Unit {
            x: self.x,
            y: self.y,
            team: self.team,
            health: if self.health <= dmg {
                0
            } else {
                self.health - dmg
            },
            attack: self.attack,
        }
    }

    fn is_alive(&self) -> bool {
        self.health > 0
    }

    fn do_move(&self, walls: &HashSet<(usize, usize)>, units: &Vec<Unit>) -> Unit {
        let width = *walls.iter().map(|(x, _)| x).max().unwrap() as usize;

        let mut targets: Vec<(usize, usize)> = Vec::new();
        for m in 0..units.len() {
            let u2 = &units[m];
            if !u2.is_alive() {
                continue;
            }
            if u2.team != self.team {
                for (x, y) in [
                    (u2.x, u2.y + 1),
                    (u2.x, u2.y - 1),
                    (u2.x + 1, u2.y),
                    (u2.x - 1, u2.y),
                ]
                .iter()
                {
                    if *x == self.x && *y == self.y {
                        return *self;
                    }
                    if is_empty(*x, *y, walls, units) {
                        targets.push((*x, *y));
                    }
                }
            }
        }
        let parents = dijkstra_all(&(self.x, self.y), |&(x, y)| {
            vec![(x, y - 1), (x - 1, y), (x + 1, y), (x, y + 1)]
                .into_iter()
                .filter(|&(x, y)| is_empty(x, y, walls, units))
                .map(|p| (p, 1))
        });
        targets = targets
            .into_iter()
            .filter(|p| parents.contains_key(p))
            .collect();
        targets.sort_by_key(|(x, y)| x + y * width);
        targets.sort_by_key(|p| parents[p].1);
        let target = targets.get(0);

        return match target {
            Some(t) => {
                let mut dir: Option<(usize, usize)> = None;
                let mut best_cost = 9999;

                for (sx, sy) in [
                    (self.x, self.y - 1),
                    (self.x - 1, self.y),
                    (self.x + 1, self.y),
                    (self.x, self.y + 1),
                ]
                .iter()
                {
                    if !is_empty(*sx, *sy, walls, units) {
                        continue;
                    }

                    let result = dijkstra(
                        &(*sx, *sy),
                        |&(x, y)| {
                            vec![(x, y - 1), (x - 1, y), (x + 1, y), (x, y + 1)]
                                .into_iter()
                                .filter(|&(x, y)| is_empty(x, y, walls, units))
                                .map(|p| (p, 1))
                        },
                        |p| p == t,
                    );
                    match result {
                        Some(r) => {
                            if r.1 < best_cost {
                                best_cost = r.1;
                                dir = Some((*sx, *sy));
                            }
                        }
                        None => (),
                    }
                }

                return match dir {
                    Some(d) => self.update(d.0, d.1),
                    None => *self,
                };
            }
            None => *self,
        };
    }
}

fn is_empty(x: usize, y: usize, walls: &HashSet<(usize, usize)>, units: &Vec<Unit>) -> bool {
    let other = units.iter().find(|u| u.x == x && u.y == y && u.is_alive());
    match other {
        Some(_) => return false,
        None => {
            if walls.contains(&(x, y)) {
                return false;
            }
            return true;
        }
    };
}

#[allow(dead_code)]
fn draw(walls: &HashSet<(usize, usize)>, units: &Vec<Unit>) {
    let width = *walls.iter().map(|(x, _)| x).max().unwrap() as usize;
    let height = *walls.iter().map(|(_, y)| y).max().unwrap() as usize;

    for y in 0..=height {
        for x in 0..=width {
            let unit = units.iter().find(|u| u.x == x && u.y == y && u.is_alive());

            match unit {
                Some(u) => print!("{}", if u.team { 'E' } else { 'G' }),
                None => {
                    if walls.contains(&(x, y)) {
                        print!("#");
                    } else {
                        print!(".");
                    }
                }
            }
        }
        println!("");
    }
    println!("");
}

fn part1() {
    let f = File::open("../files/2018_15_input.txt").expect("File not found.");
    let file = BufReader::new(&f);

    let mut walls: HashSet<(usize, usize)> = HashSet::new();
    let mut units: Vec<Unit> = Vec::new();

    let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();
    for (y, line) in lines.iter().enumerate() {
        for (x, c) in line.chars().enumerate() {
            if c == '#' {
                walls.insert((x, y));
            }
            if c == 'E' || c == 'G' {
                let unit = Unit::new(x, y, c, 3);
                units.push(unit);
            }
        }
    }

    let width = *walls.iter().map(|(x, _)| x).max().unwrap() as usize;

    let mut round = 0;
    loop {
        units.sort_by_key(|u| u.y * width + u.x);

        for n in 0..units.len() {
            if !&units[n].is_alive() {
                continue;
            }
            units[n] = units[n].do_move(&walls, &units);
            let unit = units[n];

            let targets: &mut Vec<&Unit> = &mut units
                .iter()
                .filter(|u2| u2.is_alive() && u2.team != unit.team)
                .filter(|u2| {
                    for (x, y) in [
                        (unit.x, unit.y - 1),
                        (unit.x - 1, unit.y),
                        (unit.x + 1, unit.y),
                        (unit.x, unit.y + 1),
                    ]
                    .iter()
                    {
                        if u2.x == *x && u2.y == *y {
                            return true;
                        }
                    }
                    return false;
                })
                .collect();

            if targets.len() > 0 {
                targets.sort_by_key(|u| u.y * width + u.x);
                targets.sort_by_key(|u| u.health);
                let target = targets.get(0).unwrap();

                let index = &units
                    .iter()
                    .position(|u| u.x == target.x && u.y == target.y)
                    .unwrap();
                units[*index] = units[*index].damage(unit.attack);
            }
        }
        units = units.into_iter().filter(|u| u.is_alive()).collect();

        let mut elves = false;
        let mut goblins = false;

        for n in 0..units.len() {
            if units[n].is_alive() {
                if units[n].team {
                    elves = true
                } else {
                    goblins = true
                }
            }
        }

        if !elves || !goblins {
            break;
        }

        round += 1;
    }
    let hp: usize = units.iter().map(|u| u.health as usize).sum();

    println!("{}", round * hp);
}

fn part2() {
    for attack in 4..100 {
        let f = File::open("../files/2018_15_input.txt").expect("File not found.");
        let file = BufReader::new(&f);

        let mut walls: HashSet<(usize, usize)> = HashSet::new();
        let mut units: Vec<Unit> = Vec::new();

        let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();
        for (y, line) in lines.iter().enumerate() {
            for (x, c) in line.chars().enumerate() {
                if c == '#' {
                    walls.insert((x, y));
                }
                if c == 'E' || c == 'G' {
                    let unit = Unit::new(x, y, c, if c == 'E' { attack } else { 3 });
                    units.push(unit);
                }
            }
        }

        let width = *walls.iter().map(|(x, _)| x).max().unwrap() as usize;

        let mut round = 0;
        loop {
            units.sort_by_key(|u| u.y * width + u.x);

            for n in 0..units.len() {
                if !&units[n].is_alive() {
                    continue;
                }
                units[n] = units[n].do_move(&walls, &units);
                let unit = units[n];

                let targets: &mut Vec<&Unit> = &mut units
                    .iter()
                    .filter(|u2| u2.is_alive() && u2.team != unit.team)
                    .filter(|u2| {
                        for (x, y) in [
                            (unit.x, unit.y - 1),
                            (unit.x - 1, unit.y),
                            (unit.x + 1, unit.y),
                            (unit.x, unit.y + 1),
                        ]
                        .iter()
                        {
                            if u2.x == *x && u2.y == *y {
                                return true;
                            }
                        }
                        return false;
                    })
                    .collect();

                if targets.len() > 0 {
                    targets.sort_by_key(|u| u.y * width + u.x);
                    targets.sort_by_key(|u| u.health);
                    let target = targets.get(0).unwrap();

                    let index = &units
                        .iter()
                        .position(|u| u.x == target.x && u.y == target.y)
                        .unwrap();
                    units[*index] = units[*index].damage(unit.attack);
                }
            }

            if units.iter().any(|u| u.team && !u.is_alive()) {
                break;
            }

            units = units.into_iter().filter(|u| u.is_alive()).collect();

            let mut goblins = false;

            for n in 0..units.len() {
                if units[n].is_alive() {
                    if !units[n].team {
                        goblins = true
                    }
                }
            }

            if !goblins {
                let hp: usize = units.iter().map(|u| u.health as usize).sum();
                println!("{}", round * hp);
                return;
            }

            round += 1;
        }
    }
}

pub(crate) fn main() {
    part1();
    part2();
}
