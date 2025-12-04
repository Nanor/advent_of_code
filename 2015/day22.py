#!/usr/local/bin/python3
import re

# Spells:
# - Magic Missile costs 53 mana. It instantly does 4 damage.
# - Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
# - Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
# - Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
# - Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.

# You start with 50 hit points and 500 mana points.


def game(boss_stats, hard=False):

    states = [
        {
            "boss_hp": boss_stats["hp"],
            "hp": 50,
            "mana": 500,
            "shield": 0,
            "poison": 0,
            "recharge": 0,
            "spent": 0,
            "player_turn": True,
        }
    ]

    while True:
        states.sort(key=lambda a: a["spent"])
        state = states.pop(0)

        # - Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
        if state["shield"] > 0:
            state["shield"] -= 1

        # - Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
        if state["poison"] > 0:
            state["poison"] -= 1
            state["boss_hp"] -= 3

        # - Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.
        if state["recharge"] > 0:
            state["recharge"] -= 1
            state["mana"] += 101

        if state["boss_hp"] <= 0:
            return state["spent"]

        new_states = []

        if state["player_turn"]:
            # Magic Missile costs 53 mana. It instantly does 4 damage.
            new_states.append(
                {
                    **state,
                    "hp": state["hp"] - (1 if hard else 0),
                    "player_turn": False,
                    "mana": state["mana"] - 53,
                    "spent": state["spent"] + 53,
                    "boss_hp": state["boss_hp"] - 4,
                }
            )
            # Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
            new_states.append(
                {
                    **state,
                    "hp": state["hp"] - (1 if hard else 0),
                    "player_turn": False,
                    "mana": state["mana"] - 73,
                    "spent": state["spent"] + 73,
                    "boss_hp": state["boss_hp"] - 2,
                    "hp": state["hp"] + 2,
                }
            )
            # Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
            if state["shield"] == 0:
                new_states.append(
                    {
                        **state,
                        "hp": state["hp"] - (1 if hard else 0),
                        "player_turn": False,
                        "mana": state["mana"] - 113,
                        "spent": state["spent"] + 113,
                        "shield": 6,
                    }
                )
            # Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
            if state["poison"] == 0:
                new_states.append(
                    {
                        **state,
                        "hp": state["hp"] - (1 if hard else 0),
                        "player_turn": False,
                        "mana": state["mana"] - 173,
                        "spent": state["spent"] + 173,
                        "poison": 6,
                    }
                )
            # Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.
            if state["recharge"] == 0:
                new_states.append(
                    {
                        **state,
                        "hp": state["hp"] - (1 if hard else 0),
                        "player_turn": False,
                        "mana": state["mana"] - 229,
                        "spent": state["spent"] + 229,
                        "recharge": 5,
                    }
                )
        else:
            new_states.append(
                {
                    **state,
                    "player_turn": True,
                    "hp": state["hp"]
                    - max(
                        boss_stats["damage"] - (7 if state["shield"] else 0),
                        1,
                    ),
                }
            )

        for n_s in new_states:
            if n_s["mana"] >= 0 and n_s["hp"] > 0 and n_s not in states:
                states.append(n_s)


def main():
    with open("../files/2015_22_input.txt") as fin:
        [hp, damage] = [int(re.search(r"(\d+)", l).group(0)) for l in fin]

        boss_stats = {"hp": hp, "damage": damage}

    print(game(boss_stats))
    print(game(boss_stats, True))


if __name__ == "__main__":
    main()
