import { Select } from "../../stories/select/Select";
import { useMyBugs } from "../../store/useMyBugs";

const MyBugsFilters = () => {
  const { campaigns, severities, status } = useMyBugs();
  return (
    <>
      campaign
      <Select options={campaigns.current} isSearchable />
      severity
      <Select options={severities.current} isSearchable={false} />
      status
      <Select options={status.current} isSearchable={false} />
    </>
  );
};

export default MyBugsFilters;
