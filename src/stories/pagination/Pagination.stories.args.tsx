export const BasicPaginationArgs = {
  maxPages: 10,
  current: 2,
  onPageChange: (page: Number) => {
    alert(`Going to page ${page}`);
  },
};
