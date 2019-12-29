extern crate chrono;
extern crate regex;
use chrono::{NaiveDateTime, Timelike};
use regex::Regex;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let f = File::open("files/day4.txt").expect("File not found.");
    let file = BufReader::new(&f);
    let mut lines: Vec<String> = file.lines().filter_map(|line| line.ok()).collect();

    let shift = Regex::new(r"\[(.*)\] Guard #(\d+) begins shift").unwrap();
    let sleep = Regex::new(r"\[(.*)\] falls asleep").unwrap();
    let wakes = Regex::new(r"\[(.*)\] wakes up").unwrap();
    let time_regex = Regex::new(r"\[(.*)\]").unwrap();

    let mut guard_id: u32 = 0;
    let mut sleep_time = 0;
    let mut sleep_totals: HashMap<u32, u32> = HashMap::new();
    let mut sleep_times: HashMap<u32, HashMap<u32, u32>> = HashMap::new();

    &lines.sort();
    for line in &lines {
        let m = time_regex.captures(line).unwrap();
        let time = m.get(1).map_or("", |m| m.as_str());
        let time = NaiveDateTime::parse_from_str(time, "%Y-%m-%d %H:%M")
            .unwrap()
            .minute();

        if shift.is_match(line) {
            let m = shift.captures(line).unwrap();
            guard_id = m.get(2).map_or(0, |m| m.as_str().parse().unwrap());
        }
        if sleep.is_match(line) {
            sleep_time = time;
        }
        if wakes.is_match(line) {
            let mins = time - sleep_time;
            let total = sleep_totals.entry(guard_id).or_insert(0);
            *total += mins;

            let guard = sleep_times.entry(guard_id).or_insert(HashMap::new());
            for t in sleep_time..time {
                let c = guard.entry(t).or_insert(0);
                *c += 1;
            }
        }
    }

    let sleepiest_guard = sleep_totals.iter().max_by_key(|x| x.1).unwrap().0;
    let guard_times: &HashMap<u32, u32> = sleep_times.get(sleepiest_guard).unwrap();
    let best_time = guard_times.iter().max_by_key(|x| x.1).unwrap().0;

    println!("{}", sleepiest_guard * best_time);

    let mut sleeps: Vec<(u32, u32, u32)> = Vec::new();

    for (&guard_id, times) in sleep_times.iter() {
        for (&time, &count) in times.iter() {
            sleeps.push((guard_id, time, count));
        }
    }
    let most_slept = sleeps.iter().max_by_key(|x| x.2).unwrap();

    println!("{}", most_slept.0 * most_slept.1);
}
