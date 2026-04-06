function throttle(fn, limit) {
  let inThrottle = false; // The "Lock"

  return function (...args) {
    const context = this;

    if (!inThrottle) {
      // 1. Execute the function immediately
      fn.apply(context, args);

      // 2. Lock the function
      inThrottle = true;

      // 3. Unlock it after the limit has passed
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
