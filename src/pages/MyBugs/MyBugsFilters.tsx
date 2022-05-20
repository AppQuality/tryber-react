import {
  Select,
  SelectType,
  SortTableSelect,
  SortTableSelectProps,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MyBugsFiltersProps extends SortTableSelectProps<BugsOrderByType> {
  campaigns: SelectType.Option[];
  severities: SelectType.Option[];
  status: SelectType.Option[];
}

const MyBugsFilters = ({
  campaigns,
  severities,
  status,
  order,
  orderBy,
  columns,
}: MyBugsFiltersProps) => {
  const { t } = useTranslation();
  const [selectedCampaign, setSelectedCampaign] = useState<
    SelectType.Option | undefined
  >();
  const [selectedSeverities, setSelectedSeverities] = useState<
    SelectType.Option | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<
    SelectType.Option | undefined
  >();

  const allCampaign = t("All", { context: "female" });
  const allSeverity = t("All", { context: "female" });
  const allStatus = t("All", { context: "male" });
  let campaignValue = { label: allCampaign };
  let severityValue = { label: allSeverity };
  let statusValue = { label: allStatus };

  if (
    selectedCampaign &&
    campaigns.map((c) => c.value).includes(selectedCampaign.value)
  ) {
    campaignValue = selectedCampaign;
  }
  if (
    selectedSeverities &&
    severities.map((s) => s.value).includes(selectedSeverities.value)
  ) {
    severityValue = selectedSeverities;
  }
  if (
    selectedStatus &&
    status.map((s) => s.value).includes(selectedStatus.value)
  ) {
    statusValue = selectedStatus;
  }
  return (
    <div>
      <div className="aq-mb-3">
        <Select
          label={t("Campaign")}
          onChange={setSelectedCampaign}
          name="campaign"
          options={[{ label: allCampaign }, ...campaigns]}
          value={campaignValue}
          isSearchable
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Severity")}
          onChange={setSelectedSeverities}
          name="severity"
          options={[{ label: allSeverity }, ...severities]}
          value={severityValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Status")}
          onChange={setSelectedStatus}
          name="status"
          options={[{ label: allStatus }, ...status]}
          value={statusValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <SortTableSelect
        order={order}
        orderBy={orderBy}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
    </div>
  );
};

export default MyBugsFilters;
