import React from "react";
import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";
import { updateMybugsSortingOptions } from "../../redux/myBugs/actionCreator";

export const MyBugsColumns = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateMybugsSortingOptions(newOrder, "id")).then(() =>
          setIsLoading(false)
        );
      },
      role: "overline",
    },
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      isSortable: true,
      onSort: (newOrder) => {
        setIsLoading(true);
        dispatch(updateMybugsSortingOptions(newOrder, "title")).then(() =>
          setIsLoading(false)
        );
      },
      role: "title",
      hideIndex: true,
    },
    {
      title: t("Severity"),
      dataIndex: "severity",
      key: "severity",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("Action"),
      dataIndex: "action",
      key: "action",
      align: "center",
      role: "cta",
      hideIndex: true,
    },
  ];
};
