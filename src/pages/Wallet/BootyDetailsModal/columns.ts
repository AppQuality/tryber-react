import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";
import { updateBootyDetailsSortingOptions } from "../../../redux/wallet/actionCreator";

export const bootyDetailsColumns = (
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: t("Activity name"),
      dataIndex: "activityName",
      key: "activityName",
      maxWidth: "26em",
      role: "title",
      hideIndex: true,
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateBootyDetailsSortingOptions(newOrder, "activityName"));
      },
    },
    {
      title: t("Activity"),
      dataIndex: "activityType",
      key: "activityType",
      maxWidth: "10em",
      hideIndex: true,
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateBootyDetailsSortingOptions(newOrder, "activity"));
      },
    },
    {
      title: t("Awarded on"),
      dataIndex: "attributionDate",
      key: "attributionDate",
      isSortable: true,
      onSort: (newOrder) => {
        dispatch(updateBootyDetailsSortingOptions(newOrder, "attributionDate"));
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
        dispatch(updateBootyDetailsSortingOptions(newOrder, "gross"));
      },
    },
  ];
};
