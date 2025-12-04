import getInput from "./input";
import * as days from "./days";

const day = process.argv[2];

const run = async (day: string) => {
  const code = days[`day${day}`];
  const input = await getInput(day);

  if ("load" in code) {
    code.load(input);
  }

  const answer1 = "part1" in code ? code.part1(input) : undefined;

  console.log(answer1);

  if ("part2" in code) {
    const answer2 = "part2" in code ? code.part2(input) : undefined;

    console.log(answer2);
  }
};

const main = async () => {
  if (day) {
    await run(day);
  } else {
    for (let day = 1; day <= 25; day++) {
      if (`day${day}` in days) {
        await run(`${day}`);
      }
    }
  }
};

main();
