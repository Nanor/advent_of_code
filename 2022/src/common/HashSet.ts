abstract class HashSet<T, U> {
  private map: Map<U, T>;

  constructor(items?: T[]) {
    this.map = items ? new Map(items.map((t) => [this.hash(t), t])) : new Map();
  }

  abstract hash(t: T): U;

  add(t: T) {
    this.map.set(this.hash(t), t);
    return this;
  }

  delete(t: T) {
    return this.map.delete(this.hash(t));
  }

  has(t: T) {
    return this.map.has(this.hash(t));
  }

  values() {
    return this.map.values();
  }
}

export default HashSet;
