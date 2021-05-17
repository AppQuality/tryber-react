import { PaginationProps } from "./PaginationProps";
import { Button } from "../button/Button";

const generateShrinkedPages = (
  current: number,
  maxPages: number,
  before: number,
  after: number
) => {
  let pages: Array<number | string> = [current];
  let beforeArray = [];
  for (let i = Math.max(current - before, 1); i < current; i++) {
    beforeArray.push(i);
  }
  if (beforeArray[0] !== 1) beforeArray.unshift("...");
  let afterArray = [];
  for (let i = current + 1; i < current + 1 + after; i++) {
    afterArray.push(i);
  }
  if (afterArray[afterArray.length - 1] < maxPages - 1) {
    afterArray.push("...");
  }
  if (afterArray[afterArray.length - 1] <= maxPages - 1) {
    afterArray.push(maxPages);
  }

  pages = beforeArray.concat(pages, afterArray);
  return pages;
};

export const Pagination = ({
  onPageChange,
  current,
  maxPages,
  before = 1,
  after = 1,
}: PaginationProps) => {
  let pages: Array<number | string> = [];
  if (maxPages < 5) {
    pages = Array.from(Array(maxPages).keys()).map((i) => i + 1);
  } else {
    pages = generateShrinkedPages(current, maxPages, before, after);
  }

  return (
    <div className="btn-group">
      {current > 1 ? (
        <Button
          flat={true}
          onClick={() => onPageChange(current - 1)}
          key="prev"
        >
          {"<"}
        </Button>
      ) : null}
      {pages.map((i, idx) => (
        <Button
          flat={typeof i == "string" ? true : i !== current}
          onClick={typeof i == "string" ? undefined : () => onPageChange(i)}
          key={idx}
        >
          {i}
        </Button>
      ))}
      {current < maxPages ? (
        <Button
          flat={true}
          onClick={() => onPageChange(current + 1)}
          key="next"
        >
          {">"}
        </Button>
      ) : null}
    </div>
  );
};
