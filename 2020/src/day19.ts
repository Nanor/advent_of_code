import { Input } from "./input";

export const eat = (string: string[], rules: {}, rule: string): string[] => {
  if (string.length !== 1) {
    return string
      .map((s) => eat([s], rules, rule))
      .reduce((acc, x) => [...acc, ...x], [])
      .filter((x) => x !== undefined);
  }

  if (rule.match(/"."/)) {
    if (string[0].startsWith(rule[1])) {
      return [string[0].slice(1)];
    }
    return [];
  }

  if (rule.match(/ \| /)) {
    const [r1, r2] = rule.split(" | ");

    return [...eat(string, rules, r1), ...eat(string, rules, r2)];
  }

  const rs = rule.split(" ");
  while (rs.length > 0) {
    string = eat(string, rules, rules[rs.shift()]);

    if (string === undefined) {
      return undefined;
    }
  }

  return string;
};

export const match = (string: string, rules: {}) => {
  const rest = eat([string], rules, rules[0]);

  return rest.includes("");
};

const parse = (input: Input) => {
  const [ruleString, msgString] = input.asString().split("\n\n");

  const rules = ruleString.split("\n").reduce((acc, line) => {
    const [id, rule] = line.split(": ");
    acc[id] = rule;
    return acc;
  }, {});
  const msgs = msgString.split("\n");

  return { rules, msgs };
};

const getMatches = (rules: {}, msgs: string[]) =>
  msgs.filter((m) => match(m, rules));

export const part1 = (input: Input) => {
  const { rules, msgs } = parse(input);

  return getMatches(rules, msgs).length;
};

export const part2 = (input: Input) => {
  const { rules, msgs } = parse(input);

  rules[8] = "42 | 42 8";
  rules[11] = "42 31 | 42 11 31";

  const matches = getMatches(rules, msgs);

  return matches.length;
};
