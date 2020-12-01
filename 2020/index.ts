import getInput from "./src/input";

const day = process.argv[2];
const code = require(`./src/day${day}.ts`);

const main = async () => {
  const input = await getInput(day);

  if ("part1" in code) {
    console.log(code.part1(input));
  }
  if ("part2" in code) {
    console.log(code.part2(input));
  }
};

main();
