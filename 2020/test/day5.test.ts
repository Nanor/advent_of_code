import { getRow, getColumn, getId } from "../src/day5";

describe("day5", () => {
  test("getRow", () => {
    expect(getRow("BFFFBBFRRR")).toBe(70);
    expect(getRow("FFFBBBFRRR")).toBe(14);
    expect(getRow("BBFFBBFRLL")).toBe(102);
  });

  test("getColumn", () => {
    expect(getColumn("BFFFBBFRRR")).toBe(7);
    expect(getColumn("FFFBBBFRRR")).toBe(7);
    expect(getColumn("BBFFBBFRLL")).toBe(4);
  });

    test("getId", () => {
    expect(getId("BFFFBBFRRR")).toBe(567);
    expect(getId("FFFBBBFRRR")).toBe(119);
    expect(getId("BBFFBBFRLL")).toBe(820);
  });
});
