// Currying examples
// 1) Simple manual curried function
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log("add(2)(3) =>", add(2)(3)); // 5

// 2) Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...next) {
      return curried.apply(this, args.concat(next));
    };
  };
}

// Example function that takes 3 arguments
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);
console.log("curriedMultiply(2)(3)(4) =>", curriedMultiply(2)(3)(4)); // 24
console.log("curriedMultiply(2,3)(4) =>", curriedMultiply(2, 3)(4)); // 24
console.log("curriedMultiply(2)(3,4) =>", curriedMultiply(2)(3, 4)); // 24

// 3) Practical example: partial application for logging
function log(level, timestamp, message) {
  console.log(`[${level}] ${timestamp}: ${message}`);
}

const curriedLog = curry(log);
const infoLog = curriedLog("INFO"); // partial apply level
const infoLogWithTime = infoLog(new Date().toISOString()); // partial apply timestamp
infoLogWithTime("Server started");

// 4) Utility: curry for variadic functions (example with custom arity)
// If you want to curry a function but treat it as variadic, you can wrap it with a specified arity.
function curryWithArity(fn, arity) {
  return function curried(...args) {
    if (args.length >= arity) return fn.apply(this, args);
    return function (...next) {
      return curried.apply(this, args.concat(next));
    };
  };
}

function join(a, b, c, d) {
  return [a, b, c, d].join("-");
}

const curriedJoin = curryWithArity(join, 4);
console.log(
  "curriedJoin('a')('b')('c')('d') =>",
  curriedJoin("a")("b")("c")("d"),
);

// End of examples
