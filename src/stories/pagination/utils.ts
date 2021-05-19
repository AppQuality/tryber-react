export const generateShrinkedPages = (
  current: number,
  maxPages: number,
  before: number,
  after: number
) => {
  let pages: Array<number | string> = [current];
  let prevNextArray: Array<string | number> = ["prev", "next"];
  let beforeArray = [];
  for (let i = Math.max(current - before, 1); i < current; i++) {
    beforeArray.push(i);
  }
  if (beforeArray[0] !== 1 && current !== 1) beforeArray.unshift("prev");
  let afterArray = [];
  for (let i = current + 1; i < current + 1 + after && i <= maxPages; i++) {
    afterArray.push(i);
  }
  if (afterArray[afterArray.length - 1] < maxPages - 1) {
    afterArray.push("next");
  }
  if (
    afterArray[afterArray.length - 1] <= maxPages - 1 ||
    (prevNextArray.includes(afterArray[afterArray.length - 1]) &&
      afterArray[afterArray.length - 2] <= maxPages - 1)
  ) {
    afterArray.push(maxPages);
  }
  pages = beforeArray.concat(pages, afterArray);
  return pages;
};
