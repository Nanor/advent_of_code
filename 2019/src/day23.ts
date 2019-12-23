import { Input } from "./input";
import intcode, { withInput } from "./Intcode";

type Packet = { x: number; y: number };

export const part1 = (input: Input) => {
  const prog = input.asNumberArray();

  let comps = [...Array(50)].map((_, i) => intcode(prog, [i]));
  const buses: Packet[][] = [...Array(50)].map(() => []);

  let answer;

  while (answer === undefined) {
    comps = comps.map((comp, i) => {
      while (comp.output.length > 0) {
        const [n, x, y] = comp.output.splice(0, 3);

        if (n < 50) {
          buses[n].push({ x, y });
        }

        if (n === 255 && answer === undefined) answer = y;
      }
      const input = [];
      buses[i].forEach(p => {
        input.push(p.x, p.y);
      });
      if (input.length === 0) input.push(-1);

      return withInput(comp, input);
    });
  }

  return answer;
};

export const part2 = (input: Input) => {
  const prog = input.asNumberArray();

  let comps = [...Array(50)].map((_, i) => intcode(prog, [i]));
  const buses: Packet[][] = [...Array(50)].map(() => []);

  let nat: Packet;
  const sent: number[] = [];

  let idle = 0;
  while (true) {
    comps = comps.map((comp, i) => {
      while (comp.output.length > 0) {
        const [n, x, y] = comp.output.splice(0, 3);

        if (n < 50) {
          buses[n].push({ x, y });
        } else if (n === 255) {
          nat = { x, y };
        }
      }

      let input: number[];
      if (buses[i].length) {
        const [{ x, y }] = buses[i].splice(0, 1);
        input = [x, y];
        idle = 0;
      } else {
        idle += 1;
        input = [-1];
      }

      return withInput(comp, input);
    });

    if (idle >= 100) {
      buses[0].push(nat);

      if (sent.includes(nat.y)) return nat.y;

      sent.push(nat.y);
      nat = undefined;
    }
  }
};
