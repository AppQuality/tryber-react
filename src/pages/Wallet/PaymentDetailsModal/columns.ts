import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";

import { updateDetailsSortingOptions } from "../../../redux/wallet/actionCreator";

export const paymentDetailsColumns = (
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: t("Activity name"),
      dataIndex: "activity",
      key: "activity",
      maxWidth: "28em",
      role: "title",
      isSortable: true,
      hideIndex: true,
      onSort: (newOrder) => {
        dispatch(updateDetailsSortingOptions(newOrder, "activity"));
      },
    },
    {
      title: t("Activity"),
      dataIndex: "type",
      key: "type",
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateDetailsSortingOptions(newOrder, "type"));
      },
    },
    {
      title: t("Added On"),
      dataIndex: "date",
      key: "date",
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateDetailsSortingOptions(newOrder, "date"));
      },
    },
    {
      title: t("Amount gross"),
      dataIndex: "gross",
      role: "cta",
      key: "gross",
      hideIndex: true,
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateDetailsSortingOptions(newOrder, "gross"));
      },
    },
  ];
};
