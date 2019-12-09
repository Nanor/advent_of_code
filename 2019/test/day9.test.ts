import intcode from "../src/Intcode";

describe("day9 examples", () => {
  test("quine", () => {
    const prog = [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99
    ];
    expect(intcode(prog).output).toStrictEqual(prog);
  });

  test("extended memory", () => {
    expect(
      intcode([1102, 34915192, 34915192, 7, 4, 7, 99, 0]).output
    ).toStrictEqual([1219070632396864]);
  });

  test("large values", () => {
    expect(intcode([104, 1125899906842624, 99]).output).toStrictEqual([
      1125899906842624
    ]);
  });
});
