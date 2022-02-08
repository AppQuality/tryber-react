import useWindowSize from "src/hooks/useWindowSize";
import {
  aqBootstrapTheme,
  Select,
  SelectType,
  TableType,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export interface SortTableSelectProps<T> {
  order: OrderType;
  orderBy: T;
  columns: TableType.Column[];
}

export const SortTableSelect = ({
  order,
  orderBy,
  columns,
}: SortTableSelectProps<string>) => {
  useWindowSize();
  const { t } = useTranslation();
  const [orderByValue, setOrderByValue] = useState<SelectType.Option>();
  const orderByOptions: SelectType.Option[] = [];
  const orderByCols = columns.filter((col) => col.isSortable);
  orderByCols.forEach((col) => {
    orderByOptions.push({
      label: `${col.title} ${t("ASC")}`,
      value: `${col.dataIndex} ASC`,
      order: "ASC",
      orderBy: col.dataIndex,
    });
    orderByOptions.push({
      label: `${col.title} ${t("DESC")}`,
      value: `${col.dataIndex} DESC`,
      order: "DESC",
      orderBy: col.dataIndex,
    });
  });
  const sortTable = (value: SelectType.Option) => {
    const column = columns.find((col) => col.dataIndex === value.orderBy);
    if (column?.onSort) column.onSort(value.order);
  };
  useEffect(() => {
    const val = orderByOptions.find(
      (opt) => opt.value === `${orderBy} ${order}`
    );
    setOrderByValue(val);
  }, [orderBy, order]);
  return window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches ? null : (
    <div className="aq-mb-3">
      <Select
        label={t("Order By")}
        onChange={sortTable}
        name="orderby"
        options={orderByOptions}
        value={orderByValue || { label: "", value: "" }}
        isSearchable={false}
        isClearable={false}
      />
    </div>
  );
};
