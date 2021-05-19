import { render, screen } from "@testing-library/react";
import { BasicPaginationArgs } from "./Pagination.stories.args";
import { Pagination } from "./Pagination";

const firstPagePagination = { ...BasicPaginationArgs };
firstPagePagination.current = 1;
const lastPagePagination = { ...BasicPaginationArgs };
lastPagePagination.current = lastPagePagination.maxPages;

describe("Desktop pagination", () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  it("should render the last page", () => {
    render(<Pagination {...BasicPaginationArgs} />);
    expect(screen.getByText(BasicPaginationArgs.maxPages)).toBeInTheDocument();
  });

  it("should render the current page", () => {
    render(<Pagination {...BasicPaginationArgs} />);
    expect(screen.getByText(BasicPaginationArgs.current)).toBeInTheDocument();
  });

  it("should render the prev and next link if not first or max", () => {
    render(<Pagination {...BasicPaginationArgs} />);
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
  });

  it("should not render the prev if first", () => {
    render(<Pagination {...firstPagePagination} />);
    expect(screen.queryByText("<")).not.toBeInTheDocument();
  });

  it("should not render the next if last", () => {
    render(<Pagination {...lastPagePagination} />);
    expect(screen.queryByText(">")).not.toBeInTheDocument();
  });
});
