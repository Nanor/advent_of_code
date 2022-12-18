function breadthFirstSearch<T>(
  start: T,
  hash: (t: T) => number | string,
  neighbours: (t: T) => { node: T; cost: number }[]
) {
  const toCheck = [start];

  const output: { [x: string]: { node: T; cost: number } } = {};
  output[hash(start)] = { node: start, cost: 0 };

  while (toCheck.length > 0) {
    toCheck.sort((a, b) => output[hash(a)].cost - output[hash(b)].cost);
    const next = toCheck.shift();

    for (const con of neighbours(next)) {
      const conIndex = hash(con.node);

      if (
        !output[conIndex] ||
        output[conIndex].cost > output[hash(next)].cost + con.cost
      ) {
        output[conIndex] = {
          node: con.node,
          cost: output[hash(next)].cost + con.cost,
        };
        toCheck.push(con.node);
      }
    }
  }

  return Object.values(output);
}

export default breadthFirstSearch;
