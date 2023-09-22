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
      dataIndex: "activityName",
      key: "activityName",
      maxWidth: "36em",
      role: "title",
      hideIndex: true,
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(
          updateBootyDetailsSortingOptions(newOrder, "activityName")
        ).then(() => setIsLoading(false));
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
      title: t("Amount gross"),
      dataIndex: "gross",
      key: "gross",
      isSortable: true,
      role: "cta",
      hideIndex: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateBootyDetailsSortingOptions(newOrder, "gross")).then(() =>
          setIsLoading(false)
        );
      },
    },
  ];
};
