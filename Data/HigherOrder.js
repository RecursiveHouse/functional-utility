const {letIn, cond} = require("./Expressions");
const curry = (f) => (x) => (y) => f(x, y);
const uncurry = (f, x, y) => f(x)(y);

const apply = (f) => (x) => f(x);

const mapEasy = (f) => (xs) => {
  if(xs.length === 0) return []
  const [y, ...ys] = xs
  return [f(y), ...mapEasy(f)(ys)]
}

const map = (f) => (xs) =>
  xs.length === 0 ? [] : [f(head(xs)), ...map(f)(tail(xs))];

const map2 = (f) => (xs) =>
  letIn(
    { fAfterHead: compose(f, head), mapFAfterTail: compose(map(f), tail) },
    ({ fAfterHead, mapFAfterTail }) =>
      xs.length === 0 ? [] : [fAfterHead(xs), ...mapFAfterTail(xs)]
  );

const filter = (f) => (xs) =>
  xs.length === 0
    ? []
    : f(head(x))
    ? [x, ...filter(f)(tail(xs))]
    : filter(f)(tail(xs));

const filter2 = (f) => (xs) =>
  letIn(
    { fAfterHead: compose(f, head), filterAfterTail: compose(filter(f), tail) },
    ({ fAfterHead, filterAfterTail }) =>
      xs.length === 0
        ? []
        : fAfterHead(xs)
        ? [x, ...filterAfterTail(xs)]
        : filterAfterTail(xs)
  );

const filter3 =
  letIn(
    { fAfterHead: compose(f, head), filterAfterTail: compose(filter(f), tail) },
    ({ fAfterHead, filterAfterTail }) =>
      cond([ { condition: xs.length === 0, action: constt([])}
           , { condition: fAfterHead(xs), action: constt([x, ...filterAfterTail(xs)]) }
           , { condition: otherwise, action = constt(filterAfterTail(xs)) }
           ])
  );

const reduce = (f) => (acc) => (xs) =>
  xs.length === 0
    ? []
    : letIn(
        f(acc, head(xs)),
        (newAcc) => reduce(f)(newAcc)(tail(xs))
      )

// helper functions
const head = ([x, _]) => x;
const tail = ([_, ...xs]) => xs;
const compose = (f) => (g) => (x) => f(g(x));
const constt = (a) => () => a
const otherwise = true

module.export = {
  curry,
  uncurry,
  apply,
  map,
  map2,
  map3,
  filter,
  filter2,
  filter3,
  reduce
}
