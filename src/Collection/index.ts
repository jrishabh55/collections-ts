import { cloneDeep, Selector, selector, shuffle } from '../utils/utils';

export class Collection<T> extends Array<T> {
  first(): T | undefined {
    return this.at(0);
  }

  at(index: number): T | undefined {
    const i = index < 0 ? this.length + index : index;
    return this[i];
  }

  get(index: number) {
    return this.at(index);
  }

  has(item: T) {
    return this.includes(item);
  }

  last(): T {
    return this[this.length - 1];
  }

  add(item: T) {
    return c(...this, item);
  }

  remove(item: T) {
    return this.filter((i) => i !== item);
  }

  delete(item: T) {
    return this.remove(item);
  }

  deleteAll(...items: T[]) {
    return this.filter((item) => !items.includes(item));
  }

  deleteBy(key: keyof T, value: T[keyof T]) {
    return this.filter((item) => item[key] !== value);
  }

  groupBy<K extends string | number | symbol>(key: Selector<K, T>): Record<K, T[]> {
    const map: Record<any, Collection<T>> = {} as any;
    this.forEach((item) => {
      const group = selector(key, item) as K;
      if (!map[group]) map[group] = c();
      map[group].push(item);
    });
    return map;
  }

  swap(indexA: number, indexB: number) {
    const clone = this.slice();
    const temp = clone[indexA];
    clone[indexA] = clone[indexB];
    clone[indexB] = temp;
    return c(...clone);
  }

  randomize() {
    return c(...shuffle(this));
  }

  clone() {
    return c(...this);
  }

  cloneDeep() {
    return cloneDeep(this);
  }

  uniq() {
    return c(...new Set(this));
  }

  uniqBy<K extends string | number | symbol>(key: Selector<K, T>): Collection<T> {
    const seen = new Set();
    return c(
      ...this.filter((item) => {
        const k = selector(key, item);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      }),
    );
  }

  toArray() {
    return Array.from(this);
  }
}

export const c = <T>(...args: T[]) => new Collection(...args);
