import getInput from "../src/input";
import * as days from "../src/days";

const answers = [
  [1226, 1252],
  [2039256, 1856459736],
  [845186, 4636702],
  [71708, 34726],
  [7414, 19676],
  [376194, 1693022481538],
  [326132, 88612508],
  [488, 1040429],
  [541, 847504],
  [299793, 3654963618],
  [1741, 440],
  [3485, 85062],
  [
    689,
    "###  #    ###   ##    ##  ##  #    #  #\n#  # #    #  # #  #    # #  # #    #  #\n#  # #    ###  #       # #    #    #  #\n###  #    #  # #       # # ## #    #  #\n# #  #    #  # #  # #  # #  # #    #  #\n#  # #### ###   ##   ##   ### ####  ## \n",
  ],
  [2891, 4607749009683],
  [745, 3002],
];

describe("all results", () => {
  answers.forEach(([r1, r2], i) => {
    const code = days[`day${i + 1}`];

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
