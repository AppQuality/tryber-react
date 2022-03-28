import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import React from "react";
import { TFunction } from "react-i18next";

import { updateDetailsSortingOptions } from "../../../redux/wallet/actionCreator";

export const paymentDetailsColumns = (
  id: number,
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
      role: "title",
      isSortable: true,
      hideIndex: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateDetailsSortingOptions(id, newOrder, "activity")).then(
          () => setIsLoading(false)
        );
      },
    },
    {
      title: t("Activity"),
      dataIndex: "type",
      key: "type",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateDetailsSortingOptions(id, newOrder, "type")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Added On"),
      dataIndex: "date",
      key: "date",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateDetailsSortingOptions(id, newOrder, "date")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      role: "cta",
      key: "amount",
      hideIndex: true,
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateDetailsSortingOptions(id, newOrder, "amount")).then(() =>
          setIsLoading(false)
        );
      },
    },
  ];
};
