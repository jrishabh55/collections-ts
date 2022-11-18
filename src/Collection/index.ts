export class Collection<T> extends Array<T> {

  // create a new collection from the results of a callback
  map<U>(callback: (value: T, index: number, array: T[]) => U): Collection<U> {
    return new Collection(...super.map(callback));
  }

  last(): T {
    return this[this.length - 1];
  }

  remove(item: T) {
    return this.filter((i) => i !== item);
  }

  groupBy<K extends string | number | symbol>(key: (item: T) => K): Record<K, T[]> {
    const map: Record<K, T[]> = {} as Record<K, T[]>;
    this.forEach((item) => {
      const group = key(item);
      if (!map[group]) {
        map[group] = new Collection();
      }
      map[group]!.push(item);
    });
    return map;
  }

  has(item: T) {
    return this.includes(item);
  }

  at(index: number): T | undefined {
    const i = index < 0 ? this.length + index : index;
    return this[i];
  }

  get(index: number) {
    return this.at(index);
  }

  first(): T | undefined {
    return this.at(0);
  }

  add(item: T) {
    return new Collection(...this, item);
  }

  delete(item: T) {
    return this.remove(item);
  }

  deleteAll(items: T[]) {
    return this.filter((item) => !items.includes(item));
  }

  swap(indexA: number, indexB: number) {
    const clone = this.slice();
    const temp = clone[indexA];
    clone[indexA] = clone[indexB];
    clone[indexB] = temp;
    return new Collection(...clone);
  }

  randomize() {
    return new Collection(...shuffle(this));
  }

  clone() {
    return new Collection(...this);
  }

  toArray() {
    return Array.from(this);
  }
}

export const c = <T>(...args: T[]) => new Collection(...args);
