function breadthFirstSearch<T>(
  start: T,
  hash: (t: T) => number | string,
  neighbours: (t: T) => { node: T; cost: number }[]
): { node: T; cost: number }[] {
  const toCheck = [{ node: start, cost: 0 }];

  const costs: { [x: string]: number } = {};
  costs[hash(start)] = 0;

  const output: { [x: string]: { node: T; cost: number } } = {};
  output[hash(start)] = { node: start, cost: 0 };

  while (toCheck.length > 0) {
    const next = toCheck.shift();

    if (costs[hash(next.node)] < next.cost) continue;

    for (const con of neighbours(next.node)) {
      const conIndex = hash(con.node);

      if (!costs[conIndex] || costs[conIndex] > next.cost + con.cost) {
        const e = {
          node: con.node,
          cost: next.cost + con.cost,
        };
        costs[conIndex] = e.cost;
        output[hash(con.node)] = e;

        let added = false;
        for (let c = 0; c < toCheck.length; c++) {
          const e2 = toCheck[c];
          if (e.cost <= e2.cost) {
            toCheck.splice(c, 0, e);
            added = true;
            break;
          }
        }
        if (!added) {
          toCheck.push(e);
        }
      }
    }
  }

  return Object.values(output);
}

export default breadthFirstSearch;
