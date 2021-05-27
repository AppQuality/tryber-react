import { Select } from "../../stories/select/Select";
import { useMyBugs } from "../../store/useMyBugs";
import { Formik, Field, FieldProps } from "formik";

const MyBugsFilters = () => {
  const { campaigns, severities, status } = useMyBugs();
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
