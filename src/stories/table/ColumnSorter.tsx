import { ArrowDownShort, Dash, ArrowUpShort } from "react-bootstrap-icons";
import { ColumnSorterProps, Order } from "./_types";
import { useReducer } from "react";

function changeOrder(state: Order): Order {
  return state === "ASC" ? "DESC" : "ASC";
}
export const ColumnSorter = ({ column, orderBy }: ColumnSorterProps) => {
  const [order, setOrder] = useReducer(changeOrder, "DESC");
  const handleClick = () => {
    if (column.onSort) column.onSort(order);
    setOrder();
  };
  return (
    <>
      {
        <span onClick={handleClick}>
          {(orderBy === column.key)
            ? (order === 'ASC') ? <ArrowDownShort /> : <ArrowUpShort />
            : <Dash />}
        </span>
      }
    </>
  );
};
