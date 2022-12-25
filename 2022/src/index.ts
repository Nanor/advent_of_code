import getInput from "./input";
import * as days from "./days";

const day = process.argv[2];

const run = async (day: string) => {
  const code = days[`day${day}`];
  const input = await getInput(`day${day}`);
  console.log(`Day ${day}`);
  console.log("");

  const startTime = new Date().getTime();
  if ("load" in code) {
    code.load(input);
    const loadTime = new Date().getTime() - startTime;
    console.log(`Load (${loadTime}ms)`);
    console.log("");
  }

  const part1Start = new Date().getTime();
  const answer1 = "part1" in code ? code.part1(input) : undefined;
  const part1Time = new Date().getTime() - part1Start;

  console.log(`Part 1 (${part1Time}ms)`);
  console.log(answer1);
  console.log("");

  if ("part2" in code) {
    const part2Start = new Date().getTime();
    const answer2 = "part2" in code ? code.part2(input) : undefined;
    const part2Time = new Date().getTime() - part2Start;

    console.log(`Part 2 (${part2Time}ms)`);
    console.log(answer2);
    console.log("");
  }

  const totalTime = new Date().getTime() - startTime;

  console.log(`Total (${totalTime}ms)`);
  console.log("");

  console.log("----------------------------");
  console.log("");
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
