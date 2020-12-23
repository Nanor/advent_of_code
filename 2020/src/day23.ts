import { Input } from "./input";

class Cups {
  curr: Cup;
  hash: Map<number, Cup>;
  max: number;

  constructor(cups: number[], padding = 0) {
    const max = Math.max(...cups);

    this.curr = new Cup(cups.shift());

    let c = this.curr;
    while (cups.length) {
      const n = new Cup(cups.shift());
      c.next = n;
      n.prev = c;
      c = n;
    }
    for (let i = max + 1; i <= padding; i++) {
      const n = new Cup(i);
      c.next = n;
      n.prev = c;
      c = n;
    }
    c.next = this.curr;
    this.curr.prev = c;

    this.hash = new Map();

    c = this.curr;
    this.hash.set(c.value, c);
    c = c.next;
    while (c !== this.curr) {
      this.hash.set(c.value, c);
      c = c.next;
    }

    this.max = Math.max(max, padding);
  }

  find(val: number): Cup {
    return this.hash.get(val);
  }

  move() {
    const picked = this.curr.next;
    this.curr.next = picked.next.next.next;
    picked.next.next.next.prev = this.curr;

    let next = this.curr.value - 1;
    if (next < 1) {
      next = this.max;
    }

    while (
      [picked.value, picked.next.value, picked.next.next.value].includes(next)
    ) {
      next -= 1;
      if (next < 1) {
        next = this.max;
      }
    }

    let c = this.find(next);

    picked.next.next.next = c.next;
    c.next = picked;
    picked.prev = c;
    picked.next.next.next.prev = picked.next.next;

    this.curr = this.curr.next;
  }
}

class Cup {
  value: number;
  next?: Cup;
  prev?: Cup;

  constructor(value: number) {
    this.value = value;
  }
}

export const part1 = (input: Input, count = 100) => {
  const cups = new Cups(input.asDigits());

  for (let i = 0; i < count; i++) {
    cups.move();
  }

  let c = cups.find(1).next;

  let output = "";
  for (let i = 0; i < 8; i++) {
    output += `${c.value}`;
    c = c.next;
  }

  return output;
};

export const part2 = (input: Input) => {
  const oneMillion = 1000000;
  const tenMillion = 10000000;

  const initial = input.asDigits();

  const cups = new Cups(initial, oneMillion);

  for (let i = 0; i < tenMillion; i++) {
    cups.move();
  }

  const cupOne = cups.find(1);

  return cupOne.next.value * cupOne.next.next.value;
};
