export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  long?: boolean; // ellipsis with auto width
  width?: string; // default 10ch
}

export interface Row {
  key: string;
  [index: string]: any;
}

export interface TableProps {
  /**
   * Rows
   */
  dataSource: Row[];
  /**
   * Columns
   */
  columns: Column[];
  /**
   * Pagination
   */
  pagination?: boolean;
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * striped theme
   */
  isStriped?: boolean;
}
