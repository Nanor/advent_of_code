import { Image } from "../src/day8";

describe("day8", () => {
  test("should get the correct depth", () => {
    const image = new Image("123456789012", 3, 2);

    expect(image.depth).toBe(2);
  });

  test("should get the correct values", () => {
    const image = new Image("123456789012", 3, 2);

    expect(image.get(0, 0, 0)).toBe(1);
    expect(image.get(2, 1, 0)).toBe(6);
    expect(image.get(0, 1, 1)).toBe(0);
    expect(image.get(2, 0, 1)).toBe(9);
  });

  test("should get the correct pixel values", () => {
    const image = new Image("0222112222120000", 2, 2);

    expect(image.pixel(0, 0)).toBe(0);
    expect(image.pixel(0, 1)).toBe(1);
    expect(image.pixel(1, 0)).toBe(1);
    expect(image.pixel(1, 1)).toBe(0);
  });
});
