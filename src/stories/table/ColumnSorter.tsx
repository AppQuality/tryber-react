import { Dash, SortUp, SortDown } from "react-bootstrap-icons";
import { ColumnSorterProps } from "./_types";

export const ColumnSorter = ({ column, orderBy, order }: ColumnSorterProps) => {
  const handleClick = () => {
    order = order === "DESC" ? "ASC" : "DESC";
    if (column.onSort) column.onSort(order);
  };
  return (
    <>
      {
        <span onClick={handleClick}>
          {orderBy === column.key ? (
            order === "ASC" ? (
              <SortUp />
            ) : (
              <SortDown />
            )
          ) : (
            <Dash />
          )}
        </span>
      }
    </>
  );
};
