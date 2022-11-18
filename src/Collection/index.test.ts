import { c, Collection } from '.';

test('Collection', () => {
  const collect = c(1, 2, 3, 4, 5);
  expect(collect).toBeInstanceOf(Collection);
  expect(collect).toBeInstanceOf(Array);
});

test('Collection instance', () => {
  expect(new Collection(1)).toBeInstanceOf(Collection);
});

test('Collection.map', () => {
  const collection = new Collection(1, 2);
  expect(collection.map((i) => i * 2)).toEqual(new Collection(2, 4));
});

test('Collection.last', () => {
  const collection = new Collection(1, 2);
  expect(collection.last()).toBe(2);
});

test('Collection.remove', () => {
  const collection = new Collection(1, 2);
  expect(collection.remove(1)).toEqual(new Collection(1).fill(2));
});

describe('Collection.groupBy', () => {
  test('Collection.groupBy with function', () => {
    const collection = new Collection(1, 2, 3);
    expect(collection.groupBy((i) => i % 2)).toEqual({
      0: new Collection(1).fill(2),
      1: new Collection(1, 3),
    });
  });

  test('Collection.groupBy with string', () => {
    const collection = new Collection({ a: 1 }, { a: 2 }, { a: 3 });
    expect(collection.groupBy('a')).toEqual({
      1: new Collection({ a: 1 }),
      2: new Collection({ a: 2 }),
      3: new Collection({ a: 3 }),
    });
  });
});

test('Collection.toArray', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.toArray()).toEqual([1, 2, 3]);
});

test('Collection.has', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.has(1)).toBe(true);
  expect(collection.has(4)).toBe(false);
});

test('Collection.at', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.at(0)).toBe(1);
  expect(collection.at(-1)).toBe(3);
});

test('Collection.get', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.get(0)).toBe(1);
  expect(collection.get(-1)).toBe(3);
});

test('Collection.first', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.first()).toBe(1);
});

test('Collection.add', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.add(4)).toEqual(new Collection(1, 2, 3, 4));
});

test('Collection.delete', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.delete(2)).toEqual(new Collection(1, 3));
});

test('Collection.deleteAll', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.deleteAll(1, 2)).toEqual(new Collection(1).fill(3));
});

test('Collection.deleteBy', () => {
  const collection = new Collection({ id: 1 }, { id: 2 }, { id: 3 });
  expect(collection.deleteBy('id', 2)).toEqual(new Collection({ id: 1 }, { id: 3 }));
});

test('Collection.swap', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.swap(0, 2)).toEqual(new Collection(3, 2, 1));
});

test('Collection.randomize', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.randomize()).not.toEqual(collection);
});

test('Collection.clone', () => {
  const collection = new Collection(1, 2, 3);
  const cloneCollection = collection.clone();
  expect(cloneCollection).toEqual(collection);
  collection.push(4);
  expect(cloneCollection).not.toEqual(collection);
});

test('Collection.cloneDeep', () => {
  const collection = new Collection(1, 2, 3);
  const cloneCollection = collection.cloneDeep();
  expect(cloneCollection).toEqual(collection);
  collection.push(4);
  expect(cloneCollection).not.toEqual(collection);
});

test('Collection.uniq', () => {
  const collection = new Collection(1, 2, 3, 2, 1);
  expect(collection.uniq()).toEqual(new Collection(1, 2, 3));
});

describe('Collection.uniqBy', () => {
  test('Collection.uniqBy with a function', () => {
    const collection = new Collection({ id: 1 }, { id: 2 }, { id: 3 }, { id: 2 }, { id: 1 });
    expect(collection.uniqBy((a) => a.id)).toEqual(new Collection({ id: 1 }, { id: 2 }, { id: 3 }));
  });

  test('Collection.uniqBy with a string', () => {
    const collection = new Collection({ id: 1 }, { id: 2 }, { id: 3 }, { id: 2 }, { id: 1 });
    expect(collection.uniqBy('id')).toEqual(new Collection({ id: 1 }, { id: 2 }, { id: 3 }));
  });
});
