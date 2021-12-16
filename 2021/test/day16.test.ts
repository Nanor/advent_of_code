import { part1, part2 } from "../src/days/day16";
import { asInput } from "../src/input";

describe("part 1", () => {
  test("ex 0", () => expect(part1(asInput("D2FE28"))).toBe(6));

  test("ex 1", () => expect(part1(asInput("8A004A801A8002F478"))).toBe(16));
  test("ex 2", () =>
    expect(part1(asInput("620080001611562C8802118E34"))).toBe(12));
  test("ex 3", () =>
    expect(part1(asInput("C0015000016115A2E0802F182340"))).toBe(23));
  test("ex 4", () =>
    expect(part1(asInput("A0016C880162017C3686B18A3D4780"))).toBe(31));
});

describe("part 2", () => {
  test("ex 1", () => expect(part2(asInput("C200B40A82"))).toBe(3));
  test("ex 2", () => expect(part2(asInput("04005AC33890"))).toBe(54));
  test("ex 3", () => expect(part2(asInput("880086C3E88112"))).toBe(7));
  test("ex 4", () => expect(part2(asInput("CE00C43D881120"))).toBe(9));
  test("ex 5", () => expect(part2(asInput("D8005AC2A8F0"))).toBe(1));
  test("ex 6", () => expect(part2(asInput("F600BC2D8F"))).toBe(0));
  test("ex 7", () => expect(part2(asInput("9C005AC2F8F0"))).toBe(0));
  test("ex 8", () =>
    expect(part2(asInput("9C0141080250320F1802104A08"))).toBe(1));
});
