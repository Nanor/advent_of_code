import { Input } from "./input";

const parseInput = (input: Input) => {
  const [rulesString, myTicketString, ticketsInput] = input
    .asString()
    .split("\n\n");

  const rules = {};
  rulesString.split("\n").forEach((r) => {
    const [k, v] = r.split(": ");
    const ranges = v
      .split(" or ")
      .map((x) => x.split("-").map((x) => parseInt(x)));

    rules[k] = ranges;
  });
  const tickets = ticketsInput
    .split("\n")
    .slice(1)
    .map((t) => t.split(",").map((x) => parseInt(x)));

  const myTicket = myTicketString
    .split("\n")[1]
    .split(",")
    .map((x) => parseInt(x));

  return { rules, tickets, myTicket };
};

export const part1 = (input: Input) => {
  const { rules, tickets } = parseInput(input);

  let errorRate = 0;

  const ranges: [number, number][][] = Object.values(rules);

  tickets.forEach((ticket) => {
    ticket.forEach((val) => {
      if (
        !ranges.some((rule) =>
          rule.some(([min, max]) => min <= val && val <= max)
        )
      ) {
        errorRate += val;
      }
    });
  });

  return errorRate;
};

export const part2 = (input: Input) => {
  const { rules, tickets, myTicket } = parseInput(input);

  const ranges: [number, number][][] = Object.values(rules);

  const validTickets = tickets.filter((ticket) =>
    ticket.every((val) =>
      ranges.some((rule) => rule.some(([min, max]) => min <= val && val <= max))
    )
  );

  const grid = {};
  Object.keys(rules).forEach((r) => {
    grid[r] = {};
    [...Array(tickets[0].length)].forEach((_, i) => (grid[r][i] = true));
  });

  while (
    Object.keys(rules)
      .filter((r) => r.match(/departure/))
      .some((r) => Object.values(grid[r]).filter((x) => x).length !== 1)
  ) {
    validTickets.forEach((ticket) => {
      ticket.forEach((val, i) => {
        const validPoses = Object.keys(rules).filter((p) => {
          const ranges = rules[p];
          return ranges.some(([min, max]) => min <= val && val <= max);
        });

        Object.keys(rules).forEach((p) => {
          grid[p][i] = grid[p][i] && validPoses.includes(p);
        });

        Object.keys(rules).forEach((p) => {
          const list = Object.entries(grid[p]).filter(([k, x]) => x);
          if (list.length === 1) {
            const index = list[0][0];

            Object.keys(rules).forEach((r) => {
              if (p !== r) {
                grid[r][index] = false;
              }
            });
          }
        });
      });
    });
  }

  const positions = {};
  Object.keys(rules).forEach((r) => {
    [...Array(tickets[0].length)].forEach((_, i) => {
      if (grid[r][i]) {
        positions[r] = i;
      }
    });
  });

  const entries: [string, number][] = Object.entries(positions);

  return entries
    .filter(([k, v]) => k.match(/departure/))
    .map(([k, v]) => myTicket[v])
    .reduce((x, y) => x * y, 1);
};
