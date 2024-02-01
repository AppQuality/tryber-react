import { Column } from "@appquality/appquality-design-system/dist/stories/table/_types";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/store";
import { updateExperiencePointsSortingOptions } from "../../redux/experiencePoints/actionCreator";

export const useExperiencePointsColumns = (): Column[] => {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();
  return [
    {
      title: t("Points"),
      dataIndex: "amount",
      key: "amount",
      isSortable: true,
      onSort: (newOrder) =>
        dispatch(updateExperiencePointsSortingOptions(newOrder, "amount")),
      role: "cta",
      hideIndex: true,
    },
    {
      title: t("Date"),
      dataIndex: "date",
      key: "date",
      isSortable: true,
      onSort: (newOrder) =>
        dispatch(updateExperiencePointsSortingOptions(newOrder, "date")),
      role: "overline",
      hideIndex: true,
    },
    {
      title: t("Activity"),
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: t("Campaign"),
      dataIndex: "campaign",
      key: "campaign",
    },
    {
      title: t("Reason"),
      dataIndex: "note",
      key: "note",
      role: "title",
      hideIndex: true,
    },
  ];
};
