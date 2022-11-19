export const shuffle = (array: any[]) => {
  const clone = array.slice();
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

export const uniq = <T>(array: T[]) => {
  return [...new Set(array)];
};

export const cloneDeep = <T extends object | Function>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce<any>((acc, [key, value]) => {
      acc[key] = cloneDeep(value);
      return acc;
    }, {});
  }

  if (typeof obj === 'function') {
    return obj.bind({});
  }

  return obj;
};

export type Selector<K extends string | number | symbol, T> = keyof T | ((item: T) => K);

export const selector = <T, K extends string | number | symbol>(selector: Selector<K, T>, item: T) => {
  if (typeof selector === 'function') {
    return selector(item);
  }

  return item[selector];
};
