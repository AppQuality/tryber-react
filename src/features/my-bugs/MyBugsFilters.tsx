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
  let campaignValue = { label: t("All") };
  let severityValue = { label: t("All") };
  let statusValue = { label: t("All") };
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
        options={[{ label: t("All") }, ...campaigns.current]}
        value={campaignValue}
        isSearchable
        isClearable={false}
      />
      <Select
        label={t("Severity")}
        onChange={severities.setSelected}
        name="severity"
        options={[{ label: t("All") }, ...severities.current]}
        value={severityValue}
        isSearchable={false}
        isClearable={false}
      />
      <Select
        label={t("Status")}
        onChange={status.setSelected}
        name="status"
        options={[{ label: t("All") }, ...status.current]}
        value={statusValue}
        isSearchable={false}
        isClearable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
