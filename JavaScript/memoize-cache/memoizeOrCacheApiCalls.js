// memoizeOrCacheApiCalls.js
// Utility to memoize async API calls (promises) with TTL and single-flight
// behavior (deduplicate concurrent requests for the same key).
//
// Usage:
// const memoized = memoizeApi(fetchUserById, { ttl: 60_000 });
// await memoized(1);
//
// Options:
// - ttl: milliseconds to keep cached value. 0 means no expiration (cache forever).
// - serializer: (args) => string key. Defaults to JSON.stringify(args).
// - cache: custom Map-like cache object (get/set/delete/clear). Defaults to a Map.
//
function defaultSerializer(args) {
  try {
    return JSON.stringify(args);
  } catch (err) {
    // fallback to join with | for non-serializable values
    return String(
      args
        .map((a) =>
          typeof a === "object" ? Object.prototype.toString.call(a) : a,
        )
        .join("|"),
    );
  }
}

function memoizeApi(fn, options = {}) {
  if (typeof fn !== "function")
    throw new TypeError("memoizeApi expects a function");

  const {
    ttl = 0,
    serializer = defaultSerializer,
    cache = new Map(),
  } = options;

  // cache key -> { value, expiresAt: number|null, promise }

  async function getOrSet(key, call) {
    const entry = cache.get(key);

    const now = Date.now();

    if (entry) {
      // If cached value present and not expired, return it
      if (entry.hasOwnProperty("value")) {
        if (!entry.expiresAt || entry.expiresAt > now) {
          return entry.value;
        }
        // expired: fall through to re-call
      }

      // If there's an in-flight promise, return it to deduplicate calls
      if (entry.promise) {
        return entry.promise;
      }
    }

    // Call the function and store promise to deduplicate concurrent calls
    const p = (async () => call())();

    // store/replace entry with promise
    cache.set(key, { promise: p });

    try {
      const value = await p;
      const expiresAt = ttl > 0 ? Date.now() + ttl : null;

      // store resolved value
      cache.set(key, { value, expiresAt });
      return value;
    } catch (err) {
      // on error remove cache entry so future calls may retry
      cache.delete(key);
      throw err;
    }
  }

  async function memoized(...args) {
    const key = serializer(args);
    return getOrSet(key, () => fn.apply(this, args));
  }

  // Attach utility methods for cache control
  memoized._cache = cache;

  memoized.clear = function clear() {
    if (typeof cache.clear === "function") cache.clear();
    else {
      // fallback for Map-like objects without clear
      for (const k of cache.keys()) cache.delete(k);
    }
  };

  memoized.delete = function deleteKey(...args) {
    const key = serializer(args);
    return cache.delete(key);
  };

  memoized.has = function has(...args) {
    const key = serializer(args);
    const entry = cache.get(key);
    if (!entry) return false;
    if (entry.hasOwnProperty("value")) {
      if (!entry.expiresAt) return true;
      return entry.expiresAt > Date.now();
    }
    // if only a promise is present, treat as present
    return !!entry.promise;
  };

  // force set a value into cache (useful for pre-populating)
  memoized.set = function setValueForArgs(value, ...args) {
    const key = serializer(args);
    const expiresAt = ttl > 0 ? Date.now() + ttl : null;
    cache.set(key, { value, expiresAt });
  };

  // Expose a method to invalidate expired entries (optional sweep)
  memoized.sweep = function sweepExpired() {
    const now = Date.now();
    for (const [k, entry] of cache.entries()) {
      if (
        entry &&
        entry.hasOwnProperty("expiresAt") &&
        entry.expiresAt &&
        entry.expiresAt <= now
      ) {
        cache.delete(k);
      }
    }
  };

  return memoized;
}

// ------------------ Examples ------------------
// Example async API function (simulated network call)
async function fakeFetch(id, delay = 100) {
  // simulate variable work
  await new Promise((r) => setTimeout(r, delay));
  return { id, ts: Date.now() };
}

const memoizedFetch = memoizeApi(fakeFetch, { ttl: 2000 });

// Demonstrate single-flight: two concurrent calls for same args should share result
async function demoConcurrent() {
  console.log("demoConcurrent: starting two concurrent calls for id=1");
  const [a, b] = await Promise.all([
    memoizedFetch(1, 300),
    memoizedFetch(1, 300),
  ]);
  console.log("results equal:", a.ts === b.ts, a, b);
}

// Demonstrate TTL: cached for 2 seconds
async function demoTTL() {
  console.log("\nDemo TTL: first call (cached)");
  const r1 = await memoizedFetch(2, 50);
  console.log("r1:", r1);
  console.log("calling again immediately (should be cached)");
  const r2 = await memoizedFetch(2, 50);
  console.log("r2 (cached):", r2);
  console.log("waiting 2.5s for cache to expire...");
  await new Promise((r) => setTimeout(r, 2500));
  const r3 = await memoizedFetch(2, 50);
  console.log("r3 (after expiry, new):", r3);
}

// Run demos only if script executed directly (not required when imported)
if (typeof require !== "undefined" && require.main === module) {
  (async () => {
    await demoConcurrent();
    await demoTTL();
  })();
}

// Export for Node/CommonJS
if (typeof module !== "undefined" && module.exports) {
  module.exports = { memoizeApi };
}
