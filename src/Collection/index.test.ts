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

test('Collection.groupBy', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.groupBy((i) => i % 2)).toEqual(
    {
      0: new Collection(1).fill(2),
      1: new Collection(1, 3),
    }
  );
});


test('Collection.toArray', () => {
  const collection = new Collection(1, 2, 3);
  expect(collection.toArray()).toEqual([1, 2, 3]);
});

