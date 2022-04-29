import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { TFunction } from "react-i18next";

export const RankingColumns = (t: TFunction<"translation">): Column[] => {
  return [
    {
      title: "",
      dataIndex: "borderedCell",
      key: "border",
      maxWidth: "6px",
      borderedCell: true,
      hideIndex: true,
      role: "border",
    },
    {
      title: t("__RANKING_TITLE_LABEL_POSITION_MAX:"),
      dataIndex: "position",
      key: "position",
      hideIndex: true,
      role: "left",
      maxWidth: "6em",
    },
    {
      title: "",
      dataIndex: "image",
      key: "image",
      hideIndex: true,
      role: "left",
      maxWidth: "max-content",
    },
    {
      title: t("__RANKING_TITLE_LABEL_ID_MAX:"),
      dataIndex: "id",
      key: "id",
      hideIndex: true,
      maxWidth: "7em",
    },
    {
      title: t("__RANKING_TITLE_LABEL_NAME_MAX:"),
      dataIndex: "name",
      key: "name",
      hideIndex: true,
    },
    {
      title: t("__RANKING_TITLE_LABEL_EXP_MAX:"),
      dataIndex: "exp",
      key: "monthly_exp",
      hideIndex: true,
      role: "right",
      maxWidth: "13em",
    },
  ];
};
