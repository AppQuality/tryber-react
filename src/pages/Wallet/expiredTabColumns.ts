import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";
import { updateSortingOptions } from "src/redux/wallet/actionCreator";

export const expiredTabColumns = (
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: "Nome attività",
      dataIndex: "activityName",
      key: "activityName",
      maxWidth: "max-content",
    },
    {
      title: t("Tipo attività"),
      dataIndex: "activityType",
      key: "activityType",
      role: "overline",
      hideIndex: true,
    },
    {
      title: t("Data attribuzione"),
      dataIndex: "attributionDate",
      key: "attributionDate",
      isSortable: true,
      onSort: (newOrder) => {
       // dispatch(updateSortingOptions(newOrder, "attributionDate"));
      },
    },
    {
      title: t("Tot. lordo"),
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
