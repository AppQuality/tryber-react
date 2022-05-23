import {
  Select,
  SelectType,
  SortTableSelect,
  SortTableSelectProps,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import {
  setSelectedCampaign,
  setSelectedSeverity,
  setSelectedStatus,
} from "../../redux/myBugs/actionCreator";
import { useAppDispatch } from "../../redux/provider";

interface MyBugsFiltersProps extends SortTableSelectProps<BugsOrderByType> {
  campaigns: SelectType.Option[];
  severities: SelectType.Option[];
  status: SelectType.Option[];
  selectedCampaign?: SelectType.Option;
  selectedSeverity?: SelectType.Option;
  selectedStatus?: SelectType.Option;
}

const MyBugsFilters = ({
  campaigns,
  severities,
  status,
  selectedCampaign,
  selectedSeverity,
  selectedStatus,
  order,
  orderBy,
  columns,
}: MyBugsFiltersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
    selectedSeverity &&
    severities.map((s) => s.value).includes(selectedSeverity.value)
  ) {
    severityValue = selectedSeverity;
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
          onChange={(value) => dispatch(setSelectedCampaign(value))}
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
          onChange={(value) => dispatch(setSelectedSeverity(value))}
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
          onChange={(value) => dispatch(setSelectedStatus(value))}
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
