import { PaginationProps } from "./PaginationProps";
import { Button } from "../button/Button";
import { generateShrinkedPages } from "./utils";

export const DesktopPagination = ({
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
      {current >= 1 ? (
        <Button
          flat={true}
          squared={true}
          onClick={() => onPageChange(current - 1)}
          key="prev"
        >
          {"<"}
        </Button>
      ) : null}
      {pages.map((i, idx) => (
        <Button
          squared={true}
          flat={typeof i == "string" ? true : i !== current}
          onClick={
            typeof i == "string" || i == current
              ? undefined
              : () => onPageChange(i)
          }
          key={idx}
        >
          {i}
        </Button>
      ))}
      {current < maxPages ? (
        <Button
          flat={true}
          squared={true}
          onClick={() => onPageChange(current + 1)}
          key="next"
        >
          {">"}
        </Button>
      ) : null}
    </div>
  );
};
