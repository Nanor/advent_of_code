import { Input } from "./input";

export const getRow = (pass) => {
  const binary = pass.replace(/L|R/g, "").replace(/F/g, "0").replace(/B/g, 1);
  return parseInt(binary, 2);
};

export const getColumn = (pass) => {
  const binary = pass.replace(/F|B/g, "").replace(/L/g, "0").replace(/R/g, 1);
  return parseInt(binary, 2);
};

export const getId = (pass) => getRow(pass) * 8 + getColumn(pass);

export const part1 = (input: Input) => Math.max(...input.asLines().map(getId));

export const part2 = (input: Input) => {
  const ids = input.asLines().map(getId);

  const [out] = [...Array(Math.max(...ids))]
    .map((_, i) => i)
    .filter(
      (i) => !ids.includes(i) && ids.includes(i + 1) && ids.includes(i - 1)
    );

  return out;
};
