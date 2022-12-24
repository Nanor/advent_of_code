function aStar<T>(
  start: T,
  hash: (t: T) => number | string,
  neighbours: (t: T) => { node: T; cost: number }[],
  halt: (t: T) => boolean,
  heuristic: (t: T) => number
) {
  const toCheck = [{ node: start, cost: 0, heur: heuristic(start) }];

  const costs: { [x: string]: number } = {};
  costs[hash(start)] = 0;

  while (toCheck.length > 0) {
    const next = toCheck.shift();

    if (costs[hash(next.node)] < next.cost) continue;

    if (halt?.(next.node)) return next;

    for (const con of neighbours(next.node)) {
      const conIndex = hash(con.node);

      if (!costs[conIndex] || costs[conIndex] > next.cost + con.cost) {
        const e = {
          node: con.node,
          cost: next.cost + con.cost,
          heur: next.cost + con.cost + heuristic(con.node),
        };
        costs[conIndex] = e.cost;

        let added = false;
        for (let c = 0; c < toCheck.length; c++) {
          const e2 = toCheck[c];
          if (e.heur <= e2.heur) {
            toCheck.splice(c, 0, e);
            added = true;
            break;
          }
        }
        if (!added) toCheck.push(e);
      }
    }
  }
}

export default aStar;
