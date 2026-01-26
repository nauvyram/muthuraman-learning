/**
 * Basic throttle implementation.
 * Calls `fn` at most once every `wait` milliseconds.
 * - Leading-edge invocation: first call runs immediately.
 * - Trailing-edge invocation: if calls occur during the wait window,
 *   a final call will be scheduled to run after the remaining time.
 *
 * @param {Function} fn - Function to throttle
 * @param {number} wait - Milliseconds to throttle (default 250)
 * @returns {Function} throttled function with a `cancel()` method
 */
function throttle(fn, wait = 250) {
  // Timestamp (ms) of the last time `fn` was executed.
  // When 0, no call has been executed yet.
  let last = 0;

  // Timer id for a scheduled trailing call (if any).
  let timer = null;

  function throttled(...args) {
    // Current timestamp in milliseconds
    const now = Date.now();

    // How much time remains until we are allowed to run `fn` again.
    const remaining = wait - (now - last);

    // If enough time has passed, invoke immediately (leading edge).
    if (remaining <= 0) {
      if (timer) {
        // If a trailing call was scheduled, cancel it because we're
        // invoking now and the trailing call is no longer needed.
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      return fn.apply(this, args);
    }

    // Otherwise, schedule a trailing call to run after the remaining time.
    // If one is already scheduled, do nothing — we only want a single
    // trailing invocation to happen after the throttle window.
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        // Update last to now so subsequent calls observe the new timestamp.
        last = Date.now();
        fn.apply(this, args);
      }, remaining);
    }
  }

  // Cancel any pending trailing invocation and reset state.
  throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    last = 0;
  };

  return throttled;
}
