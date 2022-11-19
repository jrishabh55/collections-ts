import { cloneDeep, selector, shuffle, uniq } from './utils';

it('shuffle an array', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffled = shuffle(array);
  expect(shuffled).not.toEqual(array);
});

it('Unique array', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const unique = uniq(array);
  expect(unique).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

describe('Clone Deep test', () => {
  it('cloneDeep', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cloned = cloneDeep(array);
    expect(cloned).toEqual(array);
    array.push(11);
    expect(cloned).not.toEqual(array);
  });

  it('cloneDeep with object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    obj.a = 4;
    expect(cloned).not.toEqual(obj);
  });

  it('cloneDeep with nested object', () => {
    const obj = { a: 1, b: 2, c: { d: 3, e: 4 } };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    obj.c.d = 5;
    expect(cloned).not.toEqual(obj);
  });

  it('cloneDeep with array', () => {
    const obj = { a: 1, b: 2, c: [1, 2, 3] };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    obj.c.push(4);
    expect(cloned).not.toEqual(obj);
  });

  it('cloneDeep with nested array', () => {
    const obj = {
      a: 1,
      b: 2,
      c: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    obj.c[0].push(4);
    expect(cloned).not.toEqual(obj);
  });

  it('cloneDeep with nested array and object', () => {
    const obj = { a: 1, b: 2, c: [[1, 2, 3], { d: 4, e: 5 }] };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    (obj.c[0] as number[]).push(4);
    expect(cloned).not.toEqual(obj);
  });

  it('deepClone a function', () => {
    const func = jest.fn(() => 'hello');
    const cloned = cloneDeep(func);
    // expect(cloned).toEqual(func);
    expect(cloned()).toEqual(func());
  });

  describe('Selector' , () => {
    test('selector with key as function', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(selector(it => it.a, obj)).toEqual(1);
      expect(selector(it => it.b, obj)).toEqual(2);
      expect(selector(it => it.c, obj)).toEqual(3);
    });

    test('selector with key as string', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(selector('a', obj)).toEqual(1);
      expect(selector('b', obj)).toEqual(2);
      expect(selector('c', obj)).toEqual(3);
    });

  });

});
