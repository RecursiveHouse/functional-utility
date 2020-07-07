const makeArray = (arr) => [...arr];
const updateArray = (idx, val, arr) =>
  arr.slice(0, idx) + [val] + arr.slice(idx + 1);

const modifyArray = (idx, fn, arr) =>
  arr.slice(0, idx) + fn(arr[idx]) + arr.slice(idx + 1);

const makeObject = (obj) =>
  Object.freeze(
    Object.keys().reduce(
      (newObj, key) =>
        typeof obj[key] === "object" && obj[key] !== null
          ? (newObj[key] = makeObject(obj[key]))
          : (newObj[key] = obj[key]),
      {}
    )
  );

const updateObject = (obj, key, value) => ({ ...obj, [key]: value });

const modifyObject = (obj, key, fn) => ({ ...obj, [key]: fn(obj[key]) });

module.export = {
  makeArray,
  updateArray,
  modifyArray,
  makeObject,
  updateObject,
  modifyObject,
};
