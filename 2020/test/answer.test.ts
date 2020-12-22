import getInput from "../src/input";

const answers = [
  [927684, 292093004],
  [418, 616],
  [247, 2983070376],
  [228, 175],
  [864, 739],
  [6763, 3512],
  [155, 54803],
  [1489, 1539],
  [15353384, 2466556],
  [1980, 4628074479616],
  [2251, 2019],
  [1631, 58606],
  [4207, 725850285300475],
  [12610010960049, 3608464522781],
  [257, 8546398],
  [21978, 1053686852011],
  [319, 2324],
  [9535936849815, 472171581333710],
  [248, 381],
  [54755174472007, 1692],
  [2485, "bqkndvb,zmb,bmrmhm,snhrpv,vflms,bqtvr,qzkjrtl,rkkrx"],
  [32162, 32534],
];

describe("all results", () => {
  answers.forEach(([r1, r2], i) => {
    const code = require(`../src/day${i + 1}`);
    if (r1) {
      test(`day ${i + 1} part 1`, async () => {
        const input = await getInput(i + 1);
        expect(code.part1(input)).toBe(r1);
      });
    }
    if (r2) {
      test(`day ${i + 1} part 2`, async () => {
        const input = await getInput(i + 1);
        expect(code.part2(input)).toBe(r2);
      });
    }
  });
});
