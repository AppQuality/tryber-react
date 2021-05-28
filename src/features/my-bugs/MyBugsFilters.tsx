import { Select } from "../../stories/select/Select";
import { Option } from "../../stories/select/_types";

interface MyBugsFiltersProps {
  campaigns: { current: Option[]; setSelected: (val: Option) => void };
  severities: { current: Option[]; setSelected: (val: Option) => void };
  status: { current: Option[]; setSelected: (val: Option) => void };
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
        defaultValue={{ label: "All" }}
        isSearchable
        isClearable={false}
      />
      <Select
        label="Severity"
        onChange={severities.setSelected}
        name="severity"
        options={[{ label: "All" }, ...severities.current]}
        defaultValue={{ label: "All" }}
        isSearchable={false}
        isClearable={false}
      />
      <Select
        label="State"
        onChange={status.setSelected}
        name="state"
        options={[{ label: "All" }, ...status.current]}
        defaultValue={{ label: "All" }}
        isSearchable={false}
        isClearable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
