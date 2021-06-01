import { Select } from "../../stories/select/Select";
import { Option } from "../../stories/select/_types";

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
  return (
    <div>
      <Select
        label="Campaign"
        onChange={campaigns.setSelected}
        name="campaign"
        options={[{ label: "All" }, ...campaigns.current]}
        value={campaigns.selected || { label: "All" }}
        isSearchable
        isClearable={false}
      />
      <Select
        label="Severity"
        onChange={severities.setSelected}
        name="severity"
        options={[{ label: "All" }, ...severities.current]}
        value={severities.selected || { label: "All" }}
        isSearchable={false}
        isClearable={false}
      />
      <Select
        label="State"
        onChange={status.setSelected}
        name="state"
        options={[{ label: "All" }, ...status.current]}
        value={status.selected || { label: "All" }}
        isSearchable={false}
        isClearable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
