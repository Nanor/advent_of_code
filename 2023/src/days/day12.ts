import { Input } from "../input";
import { sum } from "../utils";

type Row = {
  records: string;
  chunks: number[];
};

const memos = new Map<string, number>();

const startsDots = new RegExp(/^[.]*/);
const startsDotsOrQ = new RegExp(/^[.?]*/);
const startsChunk = [...Array(20)].map(
  (_, i) => new RegExp(`^[#?]{${i}}($|[.]+|[?])`)
);

const getOptions = (row: Row): number => {
  if (row.chunks.length === 0) {
    return !row.records.includes("#") ? 1 : 0;
  }

  const records = row.records.replace(startsDots, "");
  const [nextChunk, ...chunks] = row.chunks;

  let out = 0;

  const max = records.match(startsDotsOrQ)?.[0].length || 0;
  for (let i = 0; i <= max; i++) {
    const match = records.slice(i).match(startsChunk[nextChunk]);

    if (match) {
      out += getOptionsMemoed({
        records: records.slice(i + match[0].length),
        chunks,
      });
    }
  }

  return out;
};

const getOptionsMemoed = (row: Row): number => {
  const key = `${row.records};${row.chunks.join(",")}`;
  if (memos.has(key)) {
    return memos.get(key)!;
  }

  const output = getOptions(row);

  memos.set(key, output);

  return output;
};

const parse = (input: Input): Row[] =>
  input.asLines().map((line) => {
    const [records, chunks] = line.split(" ");

    return {
      records,
      chunks: chunks.split(",").map((i) => parseInt(i)),
    };
  });

export const part1 = (input: Input) =>
  parse(input)
    .map((r) => getOptionsMemoed(r))
    .reduce(sum);

export const part2 = (input: Input) =>
  parse(input)
    .map((row) => ({
      records: Array(5).fill(row.records).join("?"),
      chunks: Array(5).fill(row.chunks).flat(),
    }))
    .map((r) => getOptionsMemoed(r))
    .reduce(sum);
