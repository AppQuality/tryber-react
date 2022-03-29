import React from "react";
import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";
import { updateBootyDetailsSortingOptions } from "../../../redux/wallet/actionCreator";

export const bootyDetailsColumns = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: t("Activity name"),
      dataIndex: "name",
      key: "name",
      maxWidth: "36em",
      role: "title",
      hideIndex: true,
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateBootyDetailsSortingOptions(newOrder, "id")).then(() =>
          setIsLoading(false)
        );
      },
    },
    {
      title: t("Awarded on"),
      dataIndex: "attributionDate",
      key: "attributionDate",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(
          updateBootyDetailsSortingOptions(newOrder, "attributionDate")
        ).then(() => setIsLoading(false));
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
        dispatch(updateBootyDetailsSortingOptions(newOrder, "amount")).then(
          () => setIsLoading(false)
        );
      },
    },
  ];
};
