import getInput from "./input";
import * as days from "./days";

const day = process.argv[2];
const code = days[`day${day}`];

const main = async () => {
  const input = await getInput(day);

  if ("load" in code) {
    code.load(input);
  }

  if ("part1" in code) {
    console.log(code.part1(input));
  }
  if ("part2" in code) {
    console.log(code.part2(input));
  }
};

main();
