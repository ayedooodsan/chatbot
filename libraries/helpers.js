/* eslint-disable no-restricted-syntax */

export default () => {};

export function dump(obj) {
  let out = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      out += `${key}: ${obj[key]}\n`;
    }
  }

  return out;
}

export function mergeObjects(...args) {
  const dst = {};
  let src;
  let p;
  const aargs = [].splice.call(args, 0);

  while (aargs.length > 0) {
    const idx = 0;
    src = aargs.splice(0, 1)[idx];
    if (toString.call(src) === '[object Object]') {
      for (p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          if (toString.call(src[p]) === '[object Object]') {
            dst[p] = mergeObjects(dst[p] || {}, src[p]);
          } else {
            dst[p] = src[p];
          }
        }
      }
    }
  }

  return dst;
}

export function isTypeOfString(value) {
  return typeof value === 'string';
}

export function findLastIndex(array, compare) {
  let found = false;
  let index = array.length - 1;
  while (index >= 0 && !found) {
    if (compare(array[index])) {
      found = true;
    } else {
      index -= 1;
    }
  }
  return index;
}

/* eslint-enable no-restricted-syntax */
