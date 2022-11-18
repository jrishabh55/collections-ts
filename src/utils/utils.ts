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
}

export const cloneDeep = <T extends object | Function>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep) as T;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = cloneDeep(value);
      return acc;
    }, {} as any);
  }

  if (typeof obj === 'function') {
    return obj.bind({});
  }

  return obj;
}
