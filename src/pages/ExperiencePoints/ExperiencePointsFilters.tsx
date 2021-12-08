import {
  FormLabel,
  Input,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDebounce from "src/store/useDebounce";

interface ExperiencePointsFiltersProps {
  // todo: get this from useMyBugs or they could diverge
  search: {
    current: string;
    set: (val: string) => void;
  };
  campaigns: {
    current: SelectType.Option[];
    setSelected: (val: SelectType.Option) => void;
    selected: SelectType.Option | undefined;
  };
  dates: {
    current: SelectType.Option[];
    setSelected: (val: SelectType.Option) => void;
    selected: SelectType.Option | undefined;
  };
  activities: {
    current: SelectType.Option[];
    setSelected: (val: SelectType.Option) => void;
    selected: SelectType.Option | undefined;
  };
}

const ExperiencePointsFilters = ({
  search,
  campaigns,
  dates,
  activities,
}: ExperiencePointsFiltersProps) => {
  const [currentSearch, setCurrentSearch] = useState(search.current);
  const debouncedSearch = useDebounce(currentSearch, 500);
  useEffect(() => search.set(debouncedSearch), [debouncedSearch]);
  const { t } = useTranslation();
  const allCampaign = t("All", { context: "female" });
  const allActivities = t("All", { context: "female" });
  const allDates = t("All", { context: "female" });
  let campaignValue = { label: allCampaign };
  let activityValue = { label: allActivities };
  let dateValue = { label: allDates };
  if (
    campaigns.selected &&
    campaigns.current.map((c) => c.value).includes(campaigns.selected.value)
  ) {
    campaignValue = campaigns.selected;
  }
  if (
    activities.selected &&
    activities.current.map((s) => s.value).includes(activities.selected.value)
  ) {
    activityValue = activities.selected;
  }
  if (
    dates.selected &&
    dates.current.map((s) => s.value).includes(dates.selected.value)
  ) {
    dateValue = dates.selected;
  }

  return (
    <div>
      <div className="aq-mb-3">
        <FormLabel htmlFor="search" label={t("Search by reason")} />
        <Input
          placeholder={t("Search here")}
          type="search"
          id="search"
          onChange={setCurrentSearch}
        />
      </div>
      <div className="aq-mb-3">
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
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Activity")}
          onChange={activities.setSelected}
          name="severity"
          options={[{ label: allActivities }, ...activities.current]}
          value={activityValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Date")}
          onChange={dates.setSelected}
          name="status"
          options={[{ label: allDates }, ...dates.current]}
          value={dateValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
        />
      </div>
    </div>
  );
};

export default ExperiencePointsFilters;
