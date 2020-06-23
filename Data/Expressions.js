const letIn = (expr, functionBody) => functionBody(expr);

// usage example
const sumAndDouble = (a, b) => letIn(a + b, (sum) => sum + sum);

const ifThenElse = (bool, ifTrue, ifFalse) =>
  ({ ["true"]: ifTrue(), ["false"]: ifFalse() }[toString(bool)]);

const recur = ([x, ...xs], fn) =>
  ifThenElse(
    x !== undefined,
    () => {
      fn(x);
      recur(xs, fn);
    },
    () => {}
  );

const cond = ([x, ...xs]) =>
  ifThenElse(
    x !== undefined,
    () =>
      letIn(x, ({ condition, action }) =>
        ifThenElse(condition, action, () => {
          cond(xs);
        })
      ),
    () => {}
  );
