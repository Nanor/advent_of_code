import { Input } from "../input";

export const part1 = (input: Input) => {
  const [[seedStr], ...mapStrings] = input.asParagraphs();

  const seeds = [...seedStr.matchAll(/\d+/g)].flat().map((s) => parseInt(s));

  const maps = mapStrings.map(([_, ...lines]) =>
    lines.map((l) => {
      const [destination, source, range] = l.split(" ").map((x) => parseInt(x));
      return { destination, source, range };
    })
  );

  const locations = seeds.map((s) =>
    maps.reduce((s, map) => {
      for (const m of map) {
        if (s >= m.source && s < m.source + m.range) {
          return m.destination + (s - m.source);
        }
      }

      return s;
    }, s)
  );

  return Math.min(...locations);
};

export const part2 = (input: Input) => {
  const [[seedStr], ...mapStrings] = input.asParagraphs();




  let ss = [...seedStr.matchAll(/\d+/g)].flat().map((s) => parseInt(s));
  const seeds: { start: number; range: number }[] = [];
  while (ss.length) {
    let start, range;
    [start, range, ...ss] = ss;
    seeds.push({ start, range });
  }

  const mapSets = mapStrings.map(([_, ...lines]) =>
    lines.map((l) => {
      const [destination, source, range] = l.split(" ").map((x) => parseInt(x));
      return { destination, source, range };
    })
  );

  let values = seeds;
  for (const maps of mapSets) {
    maps.sort((a, b) => a.source - b.source);

    const newValues: typeof values = [];

    while (values.length) {
      const v = values.pop();
      if (!v) break;

      const validMap = maps.find(
        (m) => v.start >= m.source && v.start < m.source + m.range
      );

      if (validMap) {
        const newV = {
          start: validMap.destination + v.start - validMap.source,
          range: Math.min(v.range, validMap.source + validMap.range - v.start),
        };

        newValues.push(newV);
        if (newV.range < v.range) {
          values.push({
            start: v.start + newV.range,
            range: v.range - newV.range,
          });
        }
      } else {
        const nextMap = maps.filter((m) => m.source > v.start)[0];
        if (nextMap) {
          const newV = {
            start: v.start,
            range: nextMap.source - v.start,
          };
          newValues.push(newV);
          values.push({
            start: nextMap.source,
            range: v.range - newV.range,
          });
        } else {
          newValues.push(v);
        }
      }
    }

    values = newValues;
  }

  return Math.min(...values.map((v) => v.start));
};
