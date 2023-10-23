import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";

import { updateDetailsSortingOptions } from "../../../redux/wallet/actionCreator";

export const paymentDetailsColumns = (
  id: number,
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
        dispatch(updateDetailsSortingOptions(id, newOrder, "activity"));
      },
    },
    {
      title: t("Activity"),
      dataIndex: "type",
      key: "type",
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateDetailsSortingOptions(id, newOrder, "type"));
      },
    },
    {
      title: t("Added On"),
      dataIndex: "date",
      key: "date",
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateDetailsSortingOptions(id, newOrder, "date"));
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
        dispatch(updateDetailsSortingOptions(id, newOrder, "gross"));
      },
    },
  ];
};
