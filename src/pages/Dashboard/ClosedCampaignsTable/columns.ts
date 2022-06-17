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
      title: t("Close Date"),
      dataIndex: "closeDate",
      key: "closeDate",
      isSortable: true,
      maxWidth: "120px",
      onSort: (sorting: OrderType) => {
        setOrder(sorting);
        setOrderBy("close_date");
      },
    },
  ];
};
export default Columns;
