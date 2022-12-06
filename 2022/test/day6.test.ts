import { part1, part2 } from "../src/days/day6";
import { asInput } from "../src/input";

test("part 1", () => {
  expect(part1(asInput("bvwbjplbgvbhsrlpgdmjqwftvncz"))).toBe(5);
  expect(part1(asInput("nppdvjthqldpwncqszvftbrmjlhg"))).toBe(6);
  expect(part1(asInput("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"))).toBe(10);
  expect(part1(asInput("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"))).toBe(11);
});

test("part 2", () => {
  expect(part2(asInput("mjqjpqmgbljsphdztnvjfqwrcgsmlb"))).toBe(19);
  expect(part2(asInput("bvwbjplbgvbhsrlpgdmjqwftvncz"))).toBe(23);
  expect(part2(asInput("nppdvjthqldpwncqszvftbrmjlhg"))).toBe(23);
  expect(part2(asInput("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"))).toBe(29);
  expect(part2(asInput("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"))).toBe(26);
});
