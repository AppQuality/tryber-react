export interface PaginationProps {
  onPageChange: Function;
  current: number;
  maxPages: number;
  before?: number;
  after?: number;
  mobileText?: (current: number, maxPages?: number) => string;
}
