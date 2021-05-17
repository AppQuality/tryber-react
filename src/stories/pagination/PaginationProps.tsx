export interface PaginationProps {
  onPageChange: Function;
  current: number;
  maxPages: number;
  before: number;
  after: number;
}
