const validateUrl = (url) => {
  const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/\S*)?$/;
  return urlPattern.test(url);
};

// Example usage:
console.log(validateUrl("https://www.example.com")); // true
console.log(validateUrl("http://example.com/path/to/resource")); // true
console.log(validateUrl("www.example.com")); // false
console.log(validateUrl("example")); // false
