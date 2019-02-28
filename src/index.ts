type AnyObject = {
  [key: string]: any;
};

export const camel = (str: string) => str.replace(/_+(.?)/g, (_, p1) => p1.toUpperCase());
export const snake = (str: string) =>
  str
    .replace(/(^[A-Z])/, (_, p1) => p1.toLowerCase())
    .replace(/([A-Z]+)/g, (_, p1) => `_${p1.toLowerCase()}`);

const detectObject = (obj: any) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return true;
  }
  return false;
};

const propertyNameConverter = (converterFn: (s: string) => string) => (data: AnyObject): object => {
  const recursive = (obj: AnyObject): AnyObject => {
    const keys = data ? Object.keys(obj) : [];
    return keys.reduce((accum: object, curr: string) => {
      return {
        ...accum,
        [converterFn(curr)]: detectObject(obj[curr]) ? recursive(obj[curr]) : obj[curr],
      };
    }, {});
  };
  return recursive(data);
};

export const toSnake = propertyNameConverter(snake);
export const toCamel = propertyNameConverter(camel);