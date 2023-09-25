import { updateSortingOptions } from "src/redux/wallet/actionCreator";
import React from "react";
import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";

export const walletColumns = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: "ID",
      dataIndex: "reqId",
      key: "reqId",
      maxWidth: "max-content",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      role: "overline",
      hideIndex: true,
    },
    {
      title: t("Amount gross"),
      dataIndex: "gross",
      key: "gross",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateSortingOptions(newOrder, "gross")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Net received"),
      dataIndex: "net",
      key: "net",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateSortingOptions(newOrder, "net")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Paid On"),
      dataIndex: "paidDate",
      key: "paidDate",
      isSortable: true,
      onSort: (newOrder: OrderType) => {
        setIsLoading(true);
        dispatch(updateSortingOptions(newOrder, "paidDate")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Method"),
      dataIndex: "method",
      key: "method",
      role: "title",
      hideIndex: true,
    },
    {
      title: t("Actions"),
      dataIndex: "actions",
      key: "actions",
      align: "right",
      maxWidth: "6em",
      hideIndex: true,
      role: "cta",
    },
  ];
};
