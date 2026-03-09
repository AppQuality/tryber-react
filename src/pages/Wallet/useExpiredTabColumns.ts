import { useTranslation } from "react-i18next";

type Column = any;

export const useExpiredTabColumns = (): Column[] => {
  const { t } = useTranslation();
  return [
    {
      title: t("Activity name"),
      dataIndex: "activityName",
      key: "activityName",
      isSortable: false,
      maxWidth: "max-content",
    },
    {
      title: t("Activity"),
      dataIndex: "activityType",
      key: "activityType",
      role: "overline",
      isSortable: false,
      hideIndex: true,
    },
    {
      title: t("Attribution date"),
      dataIndex: "attributionDate",
      key: "attributionDate",
      isSortable: false,
    },
    {
      title: t("Gross total"),
      dataIndex: "gross",
      key: "gross",
      isSortable: false,
    },
    {
      title: t("Expired On"),
      dataIndex: "expiredDate",
      key: "expiredDate",
      isSortable: false,
    },
  ];
};
