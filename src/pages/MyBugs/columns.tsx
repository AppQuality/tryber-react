import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/store";
import { updateMybugsSortingOptions } from "../../redux/myBugs/actionCreator";

export const useBugColumns = (): Column[] => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      isSortable: true,
      onSort: (newOrder) =>
        dispatch(updateMybugsSortingOptions(newOrder, "id")),
      role: "overline",
    },
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      isSortable: true,
      onSort: (newOrder) =>
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
