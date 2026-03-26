// Currying with placeholder support
// Usage: use `curry.placeholder` as the placeholder value.

function curryWithPlaceholder(fn) {
  const placeholder = curryWithPlaceholder.placeholder;

  function mergeArgs(prevArgs, nextArgs) {
    const merged = [];
    let nextIndex = 0;

    // Fill placeholders in prevArgs with values from nextArgs
    for (let i = 0; i < prevArgs.length; i++) {
      if (prevArgs[i] === placeholder) {
        if (nextIndex < nextArgs.length) {
          merged.push(nextArgs[nextIndex++]);
        } else {
          merged.push(prevArgs[i]);
        }
      } else {
        merged.push(prevArgs[i]);
      }
    }

    // Append any remaining nextArgs
    while (nextIndex < nextArgs.length) {
      merged.push(nextArgs[nextIndex++]);
    }

    return merged;
  }

  function getCurried(prevArgs) {
    return function curried(...nextArgs) {
      const allArgs = mergeArgs(prevArgs, nextArgs);

      // Check if we have enough concrete (non-placeholder) arguments
      const required = allArgs.slice(0, fn.length);
      const ready =
        required.length >= fn.length &&
        required.every((a) => a !== placeholder);

      if (ready) {
        return fn.apply(this, required);
      }

      return getCurried(allArgs);
    };
  }

  return getCurried([]);
}

// Public placeholder symbol
curryWithPlaceholder.placeholder = Symbol("curry.placeholder");

// ------------------ Examples ------------------
const _ = curryWithPlaceholder.placeholder;

function join(a, b, c, d) {
  return [a, b, c, d].join("-");
}

const curriedJoin = curryWithPlaceholder(join);

console.log(
  "curriedJoin('a')('b')('c')('d') =>",
  curriedJoin("a")("b")("c")("d"),
);
console.log(
  "curriedJoin(_, 'b', _, 'd')('a')('c') =>",
  curriedJoin(_, "b", _, "d")("a")("c"),
);
console.log(
  "curriedJoin('a', _, 'c')('b','d') =>",
  curriedJoin("a", _, "c")("b", "d"),
);

// Another example: arithmetic
function subtract(a, b, c) {
  return a - b - c;
}

const curriedSubtract = curryWithPlaceholder(subtract);
console.log("curriedSubtract(_,2,3)(1) =>", curriedSubtract(_, 2, 3)(1)); // subtract(1,2,3)
console.log("curriedSubtract(1,_,3)(2) =>", curriedSubtract(1, _, 3)(2)); // subtract(1,2,3)

// Export name compatibility (non-module environment)
// attach to global if running in node/globalThis so devs can reuse
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    curryWithPlaceholder,
    placeholder: curryWithPlaceholder.placeholder,
  };
}
