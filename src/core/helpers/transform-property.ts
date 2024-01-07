import isObject from './is-object.js';

const transformProperty = (
  property: string,
  obj: Record<string, unknown>,
  callbackFn: (object: Record<string, unknown>) => void
) =>
  Object.keys(obj)
    .forEach((key) => {
      if (key === property) {
        callbackFn(obj);
      } else if (isObject(obj[key])) {
        transformProperty(property, obj[key] as Record<string, unknown>, callbackFn);
      }
    });

export default transformProperty;
