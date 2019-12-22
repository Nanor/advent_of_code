import getInput from "../src/input";

const answers = [
  [3353880, 5027950],
  [4023471, 8051],
  [2180, 112316],
  [1873, 1264],
  [13285749, 5000972],
  [200001, 379],
  [359142, 4374895],
  [
    1088,
    "#     ##  #   ##  # ###  \n#    #  # #   ##  # #  # \n#    #     # # #### ###  \n#    # ##   #  #  # #  # \n#    #  #   #  #  # #  # \n####  ###   #  #  # ###  \n"
  ],
  [2662308295, 63441],
  [286, 504],
  [
    2539,
    " #### #    #### ###  #  #   ## ###   ##    \n    # #    #    #  # # #     # #  # #  #   \n   #  #    ###  ###  ##      # #  # #  #   \n  #   #    #    #  # # #     # ###  ####   \n #    #    #    #  # # #  #  # # #  #  #   \n #### #### #### ###  #  #  ##  #  # #  #   \n"
  ],
  [5350, 467034091553512],
  [286, 14538],
  [178154, 6226152],
  [380, 410],
  ["30379585", "22808931"],
  [3292, 651043],
  [4770, 1578],
  [112, 18261982],
  [658, 7612],
  [19359752, 1141869516],
  [7395, 32376123569821]
];

describe("all results", () => {
  answers.forEach(([r1, r2], i) => {
    const code = require(`../src/day${i + 1}`);
    test(`day ${i + 1} part 1`, async () => {
      const input = await getInput(i + 1);
      expect(code.part1(input)).toBe(r1);
    });
    test(`day ${i + 1} part 2`, async () => {
      const input = await getInput(i + 1);
      expect(code.part2(input)).toBe(r2);
    });
  });
});
