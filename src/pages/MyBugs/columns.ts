import { TFunction } from "react-i18next";
import { updateMybugsSortingOptions } from "../../redux/myBugs/actionCreator";

type Column = any;

export const MyBugsColumns = (
  dispatch: AppDispatch,
  t: TFunction<"translation">
): Column[] => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      isSortable: true,
      onSort: (newOrder: "ASC" | "DESC") =>
        dispatch(updateMybugsSortingOptions(newOrder, "id")),
      role: "overline",
    },
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      isSortable: true,
      onSort: (newOrder: "ASC" | "DESC") =>
        dispatch(updateMybugsSortingOptions(newOrder, "title")),
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
