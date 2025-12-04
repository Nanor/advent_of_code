#!/usr/local/bin/python3
import re
from itertools import combinations

weapons = [
    {"name": "Dagger", "cost": 8, "damage": 4, "armour": 0},
    {"name": "Shortsword", "cost": 10, "damage": 5, "armour": 0},
    {"name": "Warhammer", "cost": 25, "damage": 6, "armour": 0},
    {"name": "Longsword", "cost": 40, "damage": 7, "armour": 0},
    {"name": "Greataxe", "cost": 74, "damage": 8, "armour": 0},
]

armours = [
    {"name": "Leather", "cost": 13, "damage": 0, "armour": 1},
    {"name": "Chainmail", "cost": 31, "damage": 0, "armour": 2},
    {"name": "Splintmail", "cost": 53, "damage": 0, "armour": 3},
    {"name": "Bandedmail", "cost": 75, "damage": 0, "armour": 4},
    {"name": "Platemail", "cost": 102, "damage": 0, "armour": 5},
    None,
]

rings = [
    {"name": "Damage +1", "cost": 25, "damage": 1, "armour": 0},
    {"name": "Damage +2", "cost": 50, "damage": 2, "armour": 0},
    {"name": "Damage +3", "cost": 100, "damage": 3, "armour": 0},
    {"name": "Defense +1", "cost": 20, "damage": 0, "armour": 1},
    {"name": "Defense +2", "cost": 40, "damage": 0, "armour": 2},
    {"name": "Defense +3", "cost": 80, "damage": 0, "armour": 3},
    None,
]


def simulate(loadout, boss_stats):
    player_hp = 100
    boss_hp = boss_stats["hp"]

    turn = True

    while player_hp > 0 and boss_hp > 0:
        if turn:
            boss_hp -= max(1, loadout["damage"] - boss_stats["armour"])
        else:
            player_hp -= max(1, boss_stats["damage"] - loadout["armour"])
        turn = not turn

    return player_hp > 0


def part1(loadouts, boss_stats):
    loadouts.sort(key=lambda e: e["cost"])

    for loadout in loadouts:
        if simulate(loadout, boss_stats):
            return loadout["cost"]


def part2(loadouts, boss_stats):
    loadouts.sort(key=lambda e: -e["cost"])

    for loadout in loadouts:
        if not simulate(loadout, boss_stats):
            return loadout["cost"]


def main():
    with open("../files/2015_21_input.txt") as fin:
        [hp, damage, armour] = [int(re.search(r"(\d+)", l).group(0)) for l in fin]

        boss_stats = {"hp": hp, "damage": damage, "armour": armour}

    loadouts = []

    for wep in weapons:
        for arm in armours:
            for [ring1, ring2] in list(combinations(rings, 2)) + [[None, None]]:
                equip = [e for e in [wep, arm, ring1, ring2] if e]

                cost = sum(e["cost"] for e in equip)
                damage = sum(e["damage"] for e in equip)
                armour = sum(e["armour"] for e in equip)

                stats = {"cost": cost, "damage": damage, "armour": armour}
                loadouts.append(stats)

    print(part1(loadouts, boss_stats))
    print(part2(loadouts, boss_stats))


if __name__ == "__main__":
    main()
