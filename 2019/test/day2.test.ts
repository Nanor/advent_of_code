import intcode from "../src/Intcode";

test("day2 examples", () => {
  expect(intcode([1, 0, 0, 0, 99]).data).toStrictEqual([2, 0, 0, 0, 99]);
  expect(intcode([2, 3, 0, 3, 99]).data).toStrictEqual([2, 3, 0, 6, 99]);
  expect(intcode([2, 4, 4, 5, 99, 0]).data).toStrictEqual([2, 4, 4, 5, 99, 9801]);
  expect(intcode([1, 1, 1, 4, 99, 5, 6, 0, 99]).data).toStrictEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
});
