// Flatten array one level (equivalent to Array.prototype.flat(1))
// Usage: flattenLevel1([1, [2, 3], [4, [5]], 6]) => [1, 2, 3, 4, [5], 6]

function flattenLevel1(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("flattenLevel1 expects an array");
  }

  // Using reduce + concat is a concise polyfill-safe way to flatten one level
  return arr.reduce((acc, item) => acc.concat(item), []);
}

// Alternative implementation using for-of for clearer semantics and slightly
// better performance on some engines (avoids creating intermediate arrays).
function flattenLevel1ForOf(arr) {
  if (!Array.isArray(arr))
    throw new TypeError("flattenLevel1ForOf expects an array");

  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      for (const inner of item) result.push(inner);
    } else {
      result.push(item);
    }
  }
  return result;
}

// ------------------ Examples ------------------
const examples = [
  [1, [2, 3], [4, [5, 6]], 7],
  [["a"], "b", ["c", ["d"]]],
  [1, [], [2], [[[3]]]],
];

for (const ex of examples) {
  console.log("input:", JSON.stringify(ex));
  console.log("flattenLevel1:", JSON.stringify(flattenLevel1(ex)));
  console.log("flattenLevel1ForOf:", JSON.stringify(flattenLevel1ForOf(ex)));
  console.log("---");
}

// Export for Node.js / CommonJS environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { flattenLevel1, flattenLevel1ForOf };
}
