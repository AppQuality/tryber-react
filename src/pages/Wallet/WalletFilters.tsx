import { Select, SortTableSelect } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export const WalletFilters = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="aq-mb-3">
        <Select
          label={t("Campaign")}
          name="campaign"
          options={[]}
          value={{ label: "", value: "" }}
          isSearchable
          placeholder={t("Search")}
          isClearable={false}
        />
      </div>
      <SortTableSelect
        order="ASC"
        orderBy="date"
        columns={[]}
        label={t("Order By", { context: "Sort Table Select" })}
      />
    </div>
  );
};
