import useWindowSize from "src/hooks/useWindowSize";
import {
  aqBootstrapTheme,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { BugsOrderByType } from "src/pages/MyBugs/effects/useMyBugs";

export interface OrderBySelectProps {
  order: {
    current: OrderType;
    set: (val: OrderType) => void;
  };
  orderBy: {
    current: BugsOrderByType;
    set: (val: BugsOrderByType) => void;
  };
}

export const OrderBySelect = ({ order, orderBy }: OrderBySelectProps) => {
  useWindowSize();
  const { t } = useTranslation();
  const orderByColumns: BugsOrderByType[] = [
    "id",
    "status",
    "campaign",
    "title",
  ];
  const orderType: OrderType[] = ["ASC", "DESC"];
  const orderByOptions: SelectType.Option[] = [];
  orderByColumns.forEach((option) => {
    orderType.forEach((order) => {
      orderByOptions.push({
        label: t(`${option} ${order}`),
        value: `${option} ${order}`,
        order: order,
        orderBy: option,
      });
    });
  });
  const sortTable = (value: SelectType.Option) => {
    order.set(value.order);
    orderBy.set(value.orderBy);
  };
  let orderByValue = {
    label: t(`${orderBy.current} ${order.current}`),
    value: `${orderBy.current} ${order.current}`,
  };
  return window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches ? null : (
    <div className="aq-mb-3">
      <Select
        label={t("Order By")}
        onChange={sortTable}
        name="orderby"
        options={orderByOptions}
        value={orderByValue}
        isSearchable={false}
        isClearable={false}
      />
    </div>
  );
};
