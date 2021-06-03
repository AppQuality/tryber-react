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
  return (
    <div>
      <Select
        label={t("Campaign")}
        onChange={campaigns.setSelected}
        name="campaign"
        options={[{ label: t("All") }, ...campaigns.current]}
        value={campaigns.selected || { label: t("All") }}
        isSearchable
        isClearable={false}
      />
      <Select
        label={t("Severity")}
        onChange={severities.setSelected}
        name="severity"
        options={[{ label: t("All") }, ...severities.current]}
        value={severities.selected || { label: t("All") }}
        isSearchable={false}
        isClearable={false}
      />
      <Select
        label={t("Status")}
        onChange={status.setSelected}
        name="status"
        options={[{ label: t("All") }, ...status.current]}
        value={status.selected || { label: t("All") }}
        isSearchable={false}
        isClearable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
