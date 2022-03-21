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
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: t("Paid On"),
      dataIndex: "paidDate",
      key: "paidDate",
      onSort: (newOrder: OrderType) => {
        setIsLoading(true);
        dispatch(updateSortingOptions(newOrder, "updated")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Method"),
      dataIndex: "method",
      key: "method",
    },
    // {
    //   title: t("Actions"),
    //   dataIndex: "actions",
    //   key: "actions",
    // },
  ];
};
