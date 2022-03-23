import React from "react";
import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";

export const paymentDetailsColumns = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: t("Activity name"),
      dataIndex: "activity",
      key: "activity",
      maxWidth: "28em",
      isSortable: true,
    },
    {
      title: t("Activity"),
      dataIndex: "type",
      key: "type",
      isSortable: true,
    },
    {
      title: t("Added On"),
      dataIndex: "date",
      key: "date",
      isSortable: true,
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
    },
  ];
};
