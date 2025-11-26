import { Input } from "../input";

type Link = {
  value: number;
  next?: Link;
  prev?: Link;
};

const solve = (input: Input, premultiply = 1, mixCount = 1) => {
  const numbers = input.asNumbers();

  const links: Link[] = numbers.map((v) => ({ value: v * premultiply }));

  links.forEach((l, i) => {
    l.next = links[i + 1];
    l.prev = links[i - 1];
  });
  links[0].prev = links[links.length - 1];
  links[links.length - 1].next = links[0];

  for (let i = 0; i < mixCount; i++) {
    [...links].forEach((link) => {
      link.next.prev = link.prev;
      link.prev.next = link.next;

      let curr = link.prev;
      [...Array(Math.abs(link.value % (links.length - 1)))].forEach(() => {
        curr = link.value > 0 ? curr.next : curr.prev;
      });

      link.prev = curr;
      link.next = curr.next;
      link.prev.next = link;
      link.next.prev = link;
    });
  }

  const outs = [];

  let curr = links.find((v) => v.value === 0);
  for (let i = 0; i < 3; i++) {
    [...Array(1000 % links.length)].forEach(() => {
      curr = curr.next;
    });

    outs.push(curr.value);
  }

  return outs.reduce((x, a) => x + a, 0);
};

export const part1 = (input: Input) => solve(input);
export const part2 = (input: Input) => solve(input, 811589153, 10);
