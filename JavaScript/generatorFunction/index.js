function* generatorPaginator(items, pageSize) {
  let page = 0;
  while (true) {
    let start = page * pageSize;
    let end = start + pageSize;
    yield items.slice(start, end);
    if (end >= items.length) {
      return;
    }
    page++;
  }
}

const pager = generatorPaginator([1, 2, 3, 4, 5, 6], 2);

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
