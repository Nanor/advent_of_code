import { Input } from "./input";

const asPassports = (file) =>
  file.split("\n\n").map((str) =>
    str
      .split(/ |\n/)
      .map((x) => x.split(":"))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
  );

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export const part1 = (input: Input) => {
  const file = input.asString();

  const passports = asPassports(file);

  return passports.filter((p) => fields.every((f) => f in p)).length;
};

export const part2 = (input: Input) => {
  const file = input.asString();

  const passports = asPassports(file);

  return passports.filter((p) => {
    if (!fields.every((f) => f in p)) {
      return false;
    }

    const byr = parseInt(p["byr"]);
    const iyr = parseInt(p["iyr"]);
    const eyr = parseInt(p["eyr"]);
    const hgt = parseInt(p["hgt"]);

    return (
      byr >= 1920 &&
      byr <= 2002 &&
      iyr >= 2010 &&
      iyr <= 2020 &&
      eyr >= 2020 &&
      eyr <= 2030 &&
      ((p["hgt"].endsWith("cm") && hgt >= 150 && hgt <= 193) ||
        (p["hgt"].endsWith("in") && hgt >= 59 && hgt <= 76)) &&
      p["hcl"].match(/^#[0-9a-f]{6}$/) &&
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(p["ecl"]) &&
      p["pid"].match(/^\d{9}$/)
    );
  }).length;
};
