export interface PaginationProps {
  onPageChange: Function;
  current: number;
  maxPages: number;
  size?: number;
  mobileText?: (current: number, maxPages?: number) => string;
}

export interface PageItem {
  action: Function;
  flat: boolean;
  page: string | number;
}
