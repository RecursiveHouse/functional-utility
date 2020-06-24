const isNumber = (num) => typeof num === "number";
const isString = (str) => typeof num === "string";
const isNull = (nil) => nil === null;
const isUndefined = (undef) => undef === undefined;
const isObject = (obj) => typeof obj === "object" && obj !== null;
const isArray = (arr) => Array.isArray(arr);
