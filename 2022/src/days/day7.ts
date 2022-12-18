type Node = Dir | File;

type Dir = {
  type: "dir";
  name: string;
  children: Node[];
  parent: Dir | null;
};

type File = {
  type: "file";
  name: string;
  size: number;
};

const handleList = (curr: Dir, results: string[]) => {
  curr.children = results.filter(Boolean).map((r) => {
    const m = r.match(/dir (\w+)/);

    if (m) {
      return {
        type: "dir",
        name: m[1],
        children: [],
        parent: curr,
      };
    }

    const m2 = r.match(/(\d+) (.*)/);

    if (m2) {
      return {
        type: "file",
        name: m2[2],
        size: parseInt(m2[1]),
      };
    }
  });
};

const build = (input: Input) => {
  const root: Dir = {
    type: "dir",
    name: "/",
    children: [],
    parent: null,
  };
  let curr = root;

  input
    .asString()
    .split("$ ")
    .forEach((chunk) => {
      const [command, ...results] = chunk.split("\n");

      if (command === "ls") {
        handleList(curr, results);
        return;
      }

      if (command === "cd ..") {
        curr = curr.parent;
        return;
      }
      if (command === "cd /") {
        curr = root;
        return;
      }
      const m = command.match(/cd (.*)/);

      curr = curr.children.find(
        (node): node is Dir => node.name === m[1] && node.type === "dir"
      );
    });

  return root;
};

const getSizes = (tree: Dir) => {
  const sizes = [];

  const check = (dir: Dir): number => {
    const size = dir.children
      .map((c) => {
        if (c.type === "file") return c.size;

        return check(c);
      })
      .reduce((x, a) => x + a, 0);

    sizes.push(size);

    return size;
  };

  const total = check(tree);

  return { total, sizes };
};

export const part1 = (input: Input) => {
  const tree = build(input);
  const { sizes } = getSizes(tree);

  return sizes.filter((s) => s <= 100000).reduce((a, x) => a + x, 0);
};

export const part2 = (input: Input) => {
  const tree = build(input);
  const { total, sizes } = getSizes(tree);

  const threshold = total - 40000000;
  const options = sizes.filter((s) => s >= threshold);
  options.sort((a, b) => a - b);

  return options[0];
};
