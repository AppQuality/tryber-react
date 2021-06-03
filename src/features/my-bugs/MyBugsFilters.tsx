import { Select } from "../../stories/select/Select";
import { Option } from "../../stories/select/_types";
import { useTranslation } from "react-i18next";

interface MyBugsFiltersProps {
  // todo: get this from useMyBugs or they could diverge
  campaigns: {
    current: Option[];
    setSelected: (val: Option) => void;
    selected: Option | undefined;
  };
  severities: {
    current: Option[];
    setSelected: (val: Option) => void;
    selected: Option | undefined;
  };
  status: {
    current: Option[];
    setSelected: (val: Option) => void;
    selected: Option | undefined;
  };
}

const MyBugsFilters = ({
  campaigns,
  severities,
  status,
}: MyBugsFiltersProps) => {
  const { t } = useTranslation();
  const allCampaign = t("All", { context: "female" });
  const allSeverity = t("All", { context: "male" });
  const allStatus = t("All", { context: "female" });
  let campaignValue = { label: allCampaign };
  let severityValue = { label: allSeverity };
  let statusValue = { label: allStatus };
  if (
    campaigns.selected &&
    campaigns.current.map((c) => c.value).includes(campaigns.selected.value)
  ) {
    campaignValue = campaigns.selected;
  }
  if (
    severities.selected &&
    severities.current.map((s) => s.value).includes(severities.selected.value)
  ) {
    severityValue = severities.selected;
  }
  if (
    status.selected &&
    status.current.map((s) => s.value).includes(status.selected.value)
  ) {
    statusValue = status.selected;
  }
  return (
    <div>
      <Select
        label={t("Campaign")}
        onChange={campaigns.setSelected}
        name="campaign"
        options={[{ label: allCampaign }, ...campaigns.current]}
        value={campaignValue}
        isSearchable
        placeholder={t("Search")}
        isClearable={false}
      />
      <Select
        label={t("Severity")}
        onChange={severities.setSelected}
        name="severity"
        options={[{ label: allSeverity }, ...severities.current]}
        value={severityValue}
        isSearchable={false}
        placeholder={t("Search")}
        isClearable={false}
      />
      <Select
        label={t("Status")}
        onChange={status.setSelected}
        name="status"
        options={[{ label: allStatus }, ...status.current]}
        value={statusValue}
        isSearchable={false}
        placeholder={t("Search")}
        isClearable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
