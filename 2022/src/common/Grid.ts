class Grid<T> {
  protected grid: Map<number, T>;
  readonly width: number;

  constructor(width: number) {
    this.grid = new Map();
    this.width = width;
  }

  protected hash({ x, y }: Vec2) {
    return x + y * this.width;
  }

  set(k: Vec2, v: T) {
    this.grid.set(this.hash(k), v);
  }

  get(x: Vec2): T {
    return this.grid.get(this.hash(x));
  }

  has(x: Vec2) {
    return this.grid.has(this.hash(x));
  }

  values() {
    return Array.from(this.grid.values());
  }
}

export default Grid;
