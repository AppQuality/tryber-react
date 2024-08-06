import { TableType } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
const Columns = ({
  setOrder,
  setOrderBy,
}: {
  setOrder: (order: CampaignOrder) => void;
  setOrderBy: (orderBy: OrderBy) => void;
}): TableType.Column[] => {
  const { t } = useTranslation();

  return [
    {
      title: t("Campaign"),
      dataIndex: "campaignName",
      key: "campaignName",
      role: "title",
      hideIndex: true,
    },
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      role: "overline",
      hideIndex: true,
    },
    {
      title: t("Start Date"),
      dataIndex: "startDate",
      key: "startDate",
      isSortable: false,
      maxWidth: "120px",
    },
    {
      title: t("End Date"),
      dataIndex: "endDate",
      key: "endDate",
      isSortable: false,
      maxWidth: "120px",
    },
    {
      title: "",
      dataIndex: "availability",
      key: "availability",
      isSortable: false,
      maxWidth: "60px",
      role: "left",
    },
    {
      title: t("Action"),
      dataIndex: "actions",
      key: "actions",
      role: "cta",
      maxWidth: "120px",
      hideIndex: true,
    },
  ];
};
export default Columns;
