function throttle(func, wait, options = { leading: true, trailing: true }) {
  let timeout = null;
  let previous = 0;
  let lastArgs = null;
  let lastContext = null;

  const later = function () {
    // If leading is false, we reset previous to 0;
    // otherwise, we set it to the current timestamp.
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    func.apply(lastContext, lastArgs);
    lastContext = lastArgs = null;
  };

  const throttled = function (...args) {
    const now = Date.now();

    // If this is the first call and leading is disabled,
    // set previous to the current time so the "remaining" check fails.
    if (!previous && options.leading === false) previous = now;

    const remaining = wait - (now - previous);
    lastContext = this;
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(lastContext, lastArgs);
      lastContext = lastArgs = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  // Cancel any pending execution
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = lastContext = lastArgs = null;
  };

  // Immediately execute the pending call
  throttled.flush = function () {
    if (timeout) {
      func.apply(lastContext, lastArgs);
      throttled.cancel();
    }
  };

  return throttled;
}
