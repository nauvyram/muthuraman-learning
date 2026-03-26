/**
 * A generator function that yields chunks (pages) of an array.
 * @param {Array} items - The source data.
 * @param {number} pageSize - How many items per page.
 */
function* paginate(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

// Example Usage:
const data = ["A", "B", "C", "D", "E", "F", "G", "H"];
const pager = paginate(data, 3);

const goToNextPage = () => {
  const { value, done } = pager.next();
  if (done) {
    console.log("No more items to display.");
    return;
  }
  console.log("Rendering items:", value);
};

goToNextPage();
goToNextPage();
goToNextPage();
goToNextPage();
goToNextPage();
goToNextPage();
