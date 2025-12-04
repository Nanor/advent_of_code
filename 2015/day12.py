#!/usr/local/bin/python3
import json


def sum_json(json, ignore_red=False):
    if isinstance(json, int):
        return json
    elif isinstance(json, list):
        return sum(sum_json(j, ignore_red=ignore_red) for j in json)
    elif isinstance(json, dict):
        if "red" in json.values() and ignore_red:
            return 0
        else:
            return sum(sum_json(j, ignore_red=ignore_red) for j in json.values())
    elif isinstance(json, str):
        return 0

    raise NotImplementedError(type(json))


def main():
    with open("../files/2015_12_input.txt") as file:
        input = json.load(file)

    print(sum_json(input))
    print(sum_json(input, ignore_red=True))


if __name__ == "__main__":
    main()
