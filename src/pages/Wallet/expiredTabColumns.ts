import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";
import { updateSortingOptions } from "src/redux/wallet/actionCreator";

export const expiredTabColumns = (
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: t("Activity name"),
      dataIndex: "activityName",
      key: "activityName",
      maxWidth: "max-content",
    },
    {
      title: t("Activity"),
      dataIndex: "activityType",
      key: "activityType",
      role: "overline",
      hideIndex: true,
    },
    {
      title: t("Attribution date"),
      dataIndex: "attributionDate",
      key: "attributionDate",
      isSortable: true,
      onSort: (newOrder) => {
       // dispatch(updateSortingOptions(newOrder, "attributionDate"));
      },
    },
    {
      title: t("Gross total"),
      dataIndex: "gross",
      key: "gross",
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateSortingOptions(newOrder, "gross"));
      },
    },
    {
      title: t("Expired On"),
      dataIndex: "expiredDate",
      key: "expiredDate",
      isSortable: true,
      onSort: (newOrder: OrderType) => {
      //  dispatch(updateSortingOptions(newOrder, "expiredDate"));
      },
    },
  ];
};
