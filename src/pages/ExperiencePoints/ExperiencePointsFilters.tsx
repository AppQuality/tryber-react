import {
  FormLabel,
  Input,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDebounce from "src/hooks/useDebounce";
import {
  setSelectedActivity,
  setSelectedCampaign,
  setSelectedDate,
} from "../../redux/experiencePoints/actionCreator";
import { useAppDispatch } from "../../redux/provider";
import { useGetUsersMeExperienceQuery } from "src/services/tryberApi";
import { mapActivityName } from "src/redux/experiencePoints/utils";
import dateFormatter from "src/utils/dateFormatter";

interface ExperiencePointsFiltersProps {
  selectedCampaign?: SelectType.Option;
  selectedActivity?: SelectType.Option;
  selectedDate?: SelectType.Option;
  search: string | undefined;
}

const useSelectValues = ({
  selectedCampaign,
  selectedActivity,
  selectedDate,
}: {
  selectedCampaign?: SelectType.Option;
  selectedActivity?: SelectType.Option;
  selectedDate?: SelectType.Option;
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersMeExperienceQuery({
    filterBy: {
      campaign: selectedCampaign?.value,
      activity: selectedActivity?.value,
      date: selectedDate?.value,
    },
  });
  if (isLoading || !data) return { campaigns: [], activities: [], dates: [] };

  const campaigns: SelectType.Option[] = data.results
    .filter(
      (
        r
      ): r is {
        id: number;
        activity: { id: number };
        campaign: { id: number; title?: string | undefined };
        date: string;
        amount: number;
        note?: string | undefined;
      } => typeof r.campaign.title !== "undefined"
    )
    .map((r) => {
      return {
        value: r.campaign.id.toString(),
        label: `CP${r.campaign.id} - ${r.campaign.title}`,
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );

  const activities: SelectType.Option[] = data.results
    .filter(
      (
        r
      ): r is {
        id: number;
        activity: { id: number };
        campaign: { id: number; title?: string | undefined };
        date: string;
        amount: number;
        note?: string | undefined;
      } => typeof r.activity !== "undefined"
    )
    .map((r) => {
      return {
        value: r.activity.id.toString(),
        label: mapActivityName(r.activity.id, t) || " ",
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );

  const dates: SelectType.Option[] = data.results
    .filter(
      (
        r
      ): r is {
        id: number;
        activity: { id: number };
        campaign: { id: number; title?: string | undefined };
        date: string;
        amount: number;
        note?: string | undefined;
      } => typeof r.date !== "undefined"
    )
    .map((r) => {
      return {
        value: r.date,
        label: dateFormatter(r.date),
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.value === value.value)
    );

  return { campaigns, activities, dates };
};

const ExperiencePointsFilters = ({
  selectedCampaign,
  selectedActivity,
  selectedDate,
}: ExperiencePointsFiltersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [currentSearch, setCurrentSearch] = useState("");
  const debouncedSearch = useDebounce(currentSearch, 500);

  const { campaigns, activities, dates } = useSelectValues({
    selectedCampaign,
    selectedActivity,
    selectedDate,
  });

  const allCampaign = t("All", { context: "female" });
  const allActivities = t("All", { context: "female" });
  const allDates = t("All", { context: "female" });
  let campaignValue = { label: allCampaign };
  let activityValue = { label: allActivities };
  let dateValue = { label: allDates };

  if (
    selectedCampaign &&
    campaigns.map((c) => c.value).includes(selectedCampaign.value)
  ) {
    campaignValue = selectedCampaign;
  }
  if (
    selectedActivity &&
    activities.map((s) => s.value).includes(selectedActivity.value)
  ) {
    activityValue = selectedActivity;
  }
  if (selectedDate && dates.map((s) => s.value).includes(selectedDate.value)) {
    dateValue = selectedDate;
  }

  useEffect(() => {
    dispatch({
      type: "experiencePoints/setSearch",
      payload: debouncedSearch,
    });
  }, [debouncedSearch]);

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
          onChange={(value) => dispatch(setSelectedCampaign(value))}
          name="campaign"
          options={[{ label: allCampaign }, ...campaigns]}
          value={campaignValue}
          isSearchable
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Activity")}
          onChange={(value) => dispatch(setSelectedActivity(value))}
          name="severity"
          options={[{ label: allActivities }, ...activities]}
          value={activityValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
      <div className="aq-mb-3">
        <Select
          label={t("Date")}
          onChange={(value) => dispatch(setSelectedDate(value))}
          name="status"
          options={[{ label: allDates }, ...dates]}
          value={dateValue}
          isSearchable={false}
          placeholder={t("Search")}
          isClearable={false}
          noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
        />
      </div>
    </div>
  );
};

export default ExperiencePointsFilters;
