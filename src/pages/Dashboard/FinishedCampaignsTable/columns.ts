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
      dataIndex: "campaigns",
      key: "campaigns",
      role: "title",
      hideIndex: true,
    },
    {
      title: t("End Date"),
      dataIndex: "endDate",
      key: "endDate",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        setOrder(sorting);
        setOrderBy("end_date");
      },
    },
    {
      title: t("Action"),
      dataIndex: "actions",
      key: "actions",
      align: "center",
      role: "cta",
      hideIndex: true,
    },
  ];
};
export default Columns;
