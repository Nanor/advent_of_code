import { Coord } from "./utils";

export class Grid<T extends string> {
  private map: Map<number, T>;
  readonly width: number;
  readonly height: number;

  constructor(string: string) {
    this.map = new Map<number, T>();

    const lines = string
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    this.height = lines.length;
    this.width = lines[0].length;

    lines.forEach((line, y) =>
      line.split("").forEach((c, x) => this.set({ x, y }, c as T))
    );
  }

  get({ x, y }: Coord) {
    return this.map.get(y * this.width + x);
  }

  set({ x, y }: Coord, v: T) {
    this.map.set(y * this.width + x, v);
    return this;
  }

  indexOf(value: string): Coord | undefined {
    for (const [k, v] of this.map.entries()) {
      if (v === value) {
        return { x: k % this.width, y: Math.floor(k / this.width) };
      }
    }
  }

  entries(): [Coord, T][] {
    return [...this.map.entries()].map(([k, v]) => [
      { x: k % this.width, y: Math.floor(k / this.width) },
      v,
    ]);
  }
}
