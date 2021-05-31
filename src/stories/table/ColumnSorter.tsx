import { ArrowDownShort, Dash } from "react-bootstrap-icons";
import { ColumnSorterProps } from "./_types";

export const ColumnSorter = ({ column }: ColumnSorterProps) => {
  const handleClick = () => {
    let orderby = "ASC";
    if (column.onSort) column.onSort(orderby);
  };
  return (
    <>
      {
        <span onClick={handleClick}>
          <ArrowDownShort />
        </span>
      }
    </>
  );
};
