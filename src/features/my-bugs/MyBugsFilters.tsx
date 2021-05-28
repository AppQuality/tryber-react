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
        options={campaigns.current}
        isSearchable
      />
      <Select
        label="Status"
        onChange={severities.setSelected}
        name="severity"
        options={severities.current}
        isSearchable={false}
      />
      <Select
        label="Status"
        onChange={status.setSelected}
        name="status"
        options={status.current}
        isSearchable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
