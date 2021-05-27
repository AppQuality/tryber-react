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
      Campaign
      <Select
        onChange={campaigns.setSelected}
        name="campaign"
        options={campaigns.current}
        isSearchable
      />
      severity
      <Select
        onChange={severities.setSelected}
        name="severity"
        options={severities.current}
        isSearchable={false}
      />
      status
      <Select
        onChange={status.setSelected}
        name="status"
        options={status.current}
        isSearchable={false}
      />
    </div>
  );
};

export default MyBugsFilters;
