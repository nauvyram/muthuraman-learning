// Deep flatten utilities
// Provides:
// - flatten(arr, depth = 1): flattens up to `depth` levels (like Array.prototype.flat)
// - flattenDeep(arr): fully flattens all nested arrays
// - flattenIterative(arr): iterative stack-based full flatten
// - flattenGenerator(arr): returns a generator that yields flattened values lazily

// Recursive implementation with depth parameter
function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) throw new TypeError("flatten expects an array");

  if (depth <= 0) return arr.slice();

  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      // recurse one level less
      if (depth > 1) {
        result.push(...flatten(item, depth - 1));
      } else {
        result.push(...item);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

// Fully flatten (depth = Infinity)
function flattenDeep(arr) {
  if (!Array.isArray(arr)) throw new TypeError("flattenDeep expects an array");
  const result = [];

  (function recurse(a) {
    for (const item of a) {
      if (Array.isArray(item)) recurse(item);
      else result.push(item);
    }
  })(arr);

  return result;
}

// Iterative stack-based flatten (full flatten)
function flattenIterative(arr) {
  if (!Array.isArray(arr))
    throw new TypeError("flattenIterative expects an array");

  const stack = [...arr];
  const res = [];

  while (stack.length) {
    const val = stack.shift();
    if (Array.isArray(val)) {
      // unshift children so we process them in order
      stack.unshift(...val);
    } else {
      res.push(val);
    }
  }

  return res;
}

// Generator-based lazy flatten (full flatten)
function* flattenGenerator(arr) {
  if (!Array.isArray(arr))
    throw new TypeError("flattenGenerator expects an array");
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item;
    }
  }
}

// ---------------- Examples ----------------
const sample = [1, [2, [3, [4]], 5], [6, 7], 8, [[9]]];

console.log("input:", JSON.stringify(sample));
console.log("flatten(..., 1):", JSON.stringify(flatten(sample, 1)));
console.log("flatten(..., 2):", JSON.stringify(flatten(sample, 2)));
console.log(
  "flatten(..., Infinity) === flattenDeep:",
  JSON.stringify(flatten(sample, Infinity)),
);
console.log("flattenDeep:", JSON.stringify(flattenDeep(sample)));
console.log("flattenIterative:", JSON.stringify(flattenIterative(sample)));

// generator usage
console.log(
  "flattenGenerator:",
  JSON.stringify(Array.from(flattenGenerator(sample))),
);

// Export for Node
if (typeof module !== "undefined" && module.exports) {
  module.exports = { flatten, flattenDeep, flattenIterative, flattenGenerator };
}
