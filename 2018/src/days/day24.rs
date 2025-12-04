use regex::Regex;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug, PartialEq, Hash)]
struct Unit<'a> {
    id: usize,
    team: bool,
    size: u32,
    hp: u32,
    damage: u32,
    damage_type: &'a str,
    init: u32,

    weak: Vec<&'a str>,
    immune: Vec<&'a str>,
}

fn part1() {
    let f = File::open("../files/2018_24_input.txt").expect("File not found.");
    let file = BufReader::new(&f);
    let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

    let mut units: Vec<Unit> = vec![];

    let mut team = true;

    //(?:\((?:weak to (?P<weak>(?:\w+,? ?)+))?(?:; )?(?:immune to (?P<immune>(?:\w+,? ?)+))?\))?
    let regex = Regex::new(r"^(?P<size>\d+) units each with (?P<hp>\d+) hit points (?:\(.*\) )?with an attack that does (?P<damage>\d+) (?P<type>\w+) damage at initiative (?P<init>\w+)$").unwrap();
    let weakness_regex = Regex::new(r"weak to (?P<weak>(?:\w+,? ?)+)").unwrap();
    let immune_regex = Regex::new(r"immune to (?P<immune>(?:\w+,? ?)+)").unwrap();

    for (i, line) in lines.iter().enumerate() {
        if line == "Infection:" {
            team = false;
            continue;
        }

        let m = regex.captures(line);

        match m {
            Some(m) => {
                let w_m = weakness_regex.captures(line);
                let weak: Vec<&str> = match w_m {
                    Some(weak) => weak.name("weak").unwrap().as_str().split(", ").collect(),
                    None => vec![],
                };

                let i_m = immune_regex.captures(line);
                let immune: Vec<&str> = match i_m {
                    Some(immune) => immune
                        .name("immune")
                        .unwrap()
                        .as_str()
                        .split(", ")
                        .collect(),
                    None => vec![],
                };

                let unit = Unit {
                    id: i,
                    size: m.name("size").unwrap().as_str().parse().unwrap(),
                    hp: m.name("hp").unwrap().as_str().parse().unwrap(),
                    damage: m.name("damage").unwrap().as_str().parse().unwrap(),
                    damage_type: m.name("type").unwrap().as_str(),
                    init: m.name("init").unwrap().as_str().parse().unwrap(),

                    weak,
                    immune,

                    team: team,
                };

                units.push(unit);
            }
            None => {}
        }
    }

    while units.iter().find(|u| u.team).is_some() && units.iter().find(|u| !u.team).is_some() {
        units.sort_by_key(|unit| unit.init);
        units.sort_by_key(|unit| unit.size * unit.damage);
        units.reverse();

        let mut targets: HashMap<usize, usize> = HashMap::new();

        for unit in &units {
            let mut ts: Vec<&Unit> = units
                .iter()
                .filter(|u| u.team != unit.team)
                .filter(|u| targets.values().find(|&v| v == &u.id).is_none())
                .filter(|u| u.immune.iter().find(|&i| i == &unit.damage_type).is_none())
                .collect();

            ts.sort_by_key(|u| u.init);
            ts.sort_by_key(|u| u.size * u.damage);
            ts.sort_by_key(|u| {
                if u.weak.iter().find(|&w| w == &unit.damage_type).is_some() {
                    2
                } else if u.immune.iter().find(|&i| i == &unit.damage_type).is_some() {
                    0
                } else {
                    1
                }
            });

            let t = ts.last();

            match t {
                Some(t) => {
                    targets.insert(unit.id, t.id);
                }
                None => {}
            }
        }

        units.sort_by_key(|unit| unit.init);
        units.reverse();

        for index in 0..units.len() {
            let unit = &units[index];

            match units
                .iter()
                .find(|u| &u.id == targets.get(&unit.id).unwrap_or(&100000))
            {
                Some(target) => {
                    let typing = if target
                        .weak
                        .iter()
                        .find(|&w| w == &unit.damage_type)
                        .is_some()
                    {
                        2
                    } else if target
                        .immune
                        .iter()
                        .find(|&i| i == &unit.damage_type)
                        .is_some()
                    {
                        0
                    } else {
                        1
                    };

                    let damage = (unit.damage * unit.size * typing) / target.hp;

                    let i = &units.iter().position(|u| u.id == target.id).unwrap();

                    if units[*i].size <= damage {
                        units[*i].size = 0
                    } else {
                        units[*i].size -= damage;
                    }
                }
                None => {}
            }
        }

        units = units.into_iter().filter(|u| u.size > 0).collect();
    }

    println!("{}", units.iter().fold(0, |acc, u| acc + u.size));
}

fn part2() {
    for boost in 0.. {
        let f = File::open("../files/2018_24_input.txt").expect("File not found.");
        let file = BufReader::new(&f);
        let lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

        let mut units: Vec<Unit> = vec![];

        let mut team = true;

        let regex = Regex::new(r"^(?P<size>\d+) units each with (?P<hp>\d+) hit points (?:\(.*\) )?with an attack that does (?P<damage>\d+) (?P<type>\w+) damage at initiative (?P<init>\w+)$").unwrap();
        let weakness_regex = Regex::new(r"weak to (?P<weak>(?:\w+,? ?)+)").unwrap();
        let immune_regex = Regex::new(r"immune to (?P<immune>(?:\w+,? ?)+)").unwrap();

        for (i, line) in lines.iter().enumerate() {
            if line == "Infection:" {
                team = false;
                continue;
            }

            let m = regex.captures(line);

            match m {
                Some(m) => {
                    let w_m = weakness_regex.captures(line);
                    let weak: Vec<&str> = match w_m {
                        Some(weak) => weak.name("weak").unwrap().as_str().split(", ").collect(),
                        None => vec![],
                    };

                    let i_m = immune_regex.captures(line);
                    let immune: Vec<&str> = match i_m {
                        Some(immune) => immune
                            .name("immune")
                            .unwrap()
                            .as_str()
                            .split(", ")
                            .collect(),
                        None => vec![],
                    };

                    let unit = Unit {
                        id: i,
                        size: m.name("size").unwrap().as_str().parse().unwrap(),
                        hp: m.name("hp").unwrap().as_str().parse().unwrap(),
                        damage: m.name("damage").unwrap().as_str().parse::<u32>().unwrap()
                            + if team { boost } else { 0 },
                        damage_type: m.name("type").unwrap().as_str(),
                        init: m.name("init").unwrap().as_str().parse().unwrap(),

                        weak,
                        immune,

                        team: team,
                    };

                    units.push(unit);
                }
                None => {}
            }
        }

        while units.iter().find(|u| u.team).is_some() && units.iter().find(|u| !u.team).is_some() {
            units.sort_by_key(|unit| unit.init);
            units.sort_by_key(|unit| unit.size * unit.damage);
            units.reverse();

            let mut targets: HashMap<usize, usize> = HashMap::new();

            for unit in &units {
                let mut ts: Vec<&Unit> = units
                    .iter()
                    .filter(|u| u.team != unit.team)
                    .filter(|u| targets.values().find(|&v| v == &u.id).is_none())
                    .filter(|u| u.immune.iter().find(|&i| i == &unit.damage_type).is_none())
                    .collect();

                ts.sort_by_key(|u| u.init);
                ts.sort_by_key(|u| u.size * u.damage);
                ts.sort_by_key(|u| {
                    if u.weak.iter().find(|&w| w == &unit.damage_type).is_some() {
                        2
                    } else if u.immune.iter().find(|&i| i == &unit.damage_type).is_some() {
                        0
                    } else {
                        1
                    }
                });

                let t = ts.last();

                match t {
                    Some(t) => {
                        targets.insert(unit.id, t.id);
                    }
                    None => {}
                }
            }

            units.sort_by_key(|unit| unit.init);
            units.reverse();

            let mut total_damage = 0;

            for index in 0..units.len() {
                let unit = &units[index];

                match units
                    .iter()
                    .find(|u| &u.id == targets.get(&unit.id).unwrap_or(&100000))
                {
                    Some(target) => {
                        let typing = if target
                            .weak
                            .iter()
                            .find(|&w| w == &unit.damage_type)
                            .is_some()
                        {
                            2
                        } else if target
                            .immune
                            .iter()
                            .find(|&i| i == &unit.damage_type)
                            .is_some()
                        {
                            0
                        } else {
                            1
                        };

                        let damage = (unit.damage * unit.size * typing) / target.hp;
                        total_damage += damage;

                        let i = &units.iter().position(|u| u.id == target.id).unwrap();

                        if units[*i].size <= damage {
                            units[*i].size = 0
                        } else {
                            units[*i].size -= damage;
                        }
                    }
                    None => {}
                }
            }

            units = units.into_iter().filter(|u| u.size > 0).collect();

            if total_damage == 0 {
                break;
            }
        }

        // println!("{}, {}", boost, units.iter().fold(0, |acc, u| acc + u.size));
        if units.iter().find(|u| u.team).is_some() && units.iter().find(|u| !u.team).is_none() {
            println!("{}", units.iter().fold(0, |acc, u| acc + u.size));
            break;
        }
    }
}

pub(crate) fn main() {
    part1();
    part2();
}
