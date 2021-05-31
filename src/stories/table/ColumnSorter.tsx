import { ArrowDownShort, Dash } from "react-bootstrap-icons";
import { ColumnSorterProps } from "./_types";
import {useReducer, useState} from "react";
import {Option, OptionAction} from "../select/_types";

type OrderBy = "ASC" | "DESC";

function changeOrder(state: OrderBy): OrderBy {
  return (state === "ASC") ? "DESC" : "ASC";
}
export const ColumnSorter = ({ column }: ColumnSorterProps) => {
  const [orderBy, setOrderBy] = useReducer(changeOrder, "ASC");
  const handleClick = () => {
    if (column.onSort) column.onSort(orderBy);
    setOrderBy();
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
