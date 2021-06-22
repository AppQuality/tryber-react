import { useEffect, useState } from "react";
import { operations } from "../utils/schema";
import { TableType, SelectType } from "@appquality/appquality-design-system";
import API from "../utils/api";
import { useTranslation } from "react-i18next";

export const useExperiencePoints = () => {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TableType.Row[]>([]);
  const [campaigns, setCampaigns] = useState<SelectType.Option[]>([]);
  const [activities, setActivities] = useState<SelectType.Option[]>([]);
  const [dates, setDates] = useState<SelectType.Option[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<
    SelectType.Option | undefined
  >();
  const [selectedDate, setSelectedDate] = useState<
    SelectType.Option | undefined
  >();
  const [selectedCampaign, setSelectedCampaign] = useState<
    SelectType.Option | undefined
  >();
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<"DESC" | "ASC">("DESC");
  const [orderBy, setOrderBy] = useState<"amount" | "date">("date");
  const [totalEntries, setTotalEntries] = useState(0);
  const [limit, setLimit] = useState(25);

  const mapActivityName = (activityId: number) => {
    switch (activityId) {
      case 1:
        return "compl campagn";
      case 2:
        return "bug eval (punti + -)";
      case 3:
        return "bug eval (correzione)";
      case 4:
        return "extra";
      default:
        return "other";
    }
  };

  const setFilters = (
    results: operations["get-users-me-experience"]["responses"]["200"]["content"]["application/json"]["results"]
  ) => {
    let _campaigns: SelectType.Option[] = [];
    let _activities: SelectType.Option[] = [];
    let _dates: SelectType.Option[] = [];
    results.forEach((res) => {
      if (
        typeof res.campaign === "undefined" ||
        typeof res.activity === "undefined" ||
        typeof res.date === "undefined"
      )
        return;
      if (res.campaign?.id) {
        _campaigns[res.campaign.id] = {
          label: `CP${res.campaign?.id}` || "",
          value: res.campaign.id.toString(),
        };
      }
      if (res.activity?.id) {
        _activities[res.activity.id] = {
          label: mapActivityName(res.activity.id) || "",
          value: res.activity.id.toString(),
        };
      }
      if (res.date) {
        let d = new Date(res.date);
        _dates[d.getTime()] = {
          label: res.date || "",
          value: res.date,
        };
      }
    });

    setCampaigns(_campaigns.filter((el) => el != null).reverse());
    setDates(_dates.filter((el) => el != null));
    setActivities(_activities.filter((el) => el != null));
  };

  const setExpData = (
    results: operations["get-users-me-experience"]["responses"]["200"]["content"]["application/json"]["results"]
  ) => {
    let _data: TableType.Row[] = [];
    results.forEach((res, i) => {
      if (
        typeof res.campaign === "undefined" ||
        typeof res.activity === "undefined" ||
        typeof res.date === "undefined"
      )
        return;

      _data.push({
        key: i,
        amount: res.amount,
        date: res.date,
        activity: mapActivityName(res.activity.id),
        campaign: `CP${res.campaign?.id}`,
        note: res.note,
      });
    });
    setData(_data);
  };

  const fetchExpFromAPI = (start: number) => {
    const query: operations["get-users-me-experience"]["parameters"]["query"] =
      {
        order: order,
        orderBy: orderBy,
      };
    if (
      selectedCampaign?.value ||
      selectedDate?.value ||
      selectedActivity?.value
    ) {
      query.filterBy = {};
      if (selectedCampaign?.value)
        query.filterBy.campaign = selectedCampaign.value;
      if (selectedDate?.value) query.filterBy.date = selectedDate.value;
      if (selectedActivity?.value)
        query.filterBy.activity = selectedActivity.value;
    }
    return API.experiencePoints({
      query: { ...query, limit, start },
    }).then((limitedResponse) => {
      setTotalEntries(limitedResponse.total);
      setExpData(limitedResponse.results);
      return query;
    });
  };
  /**
   *  on Component Mount
   */
  useEffect(() => {
    setIsLoading(true);

    fetchExpFromAPI(0)
      .then((query) => {
        return API.experiencePoints({
          query,
        }).then((totalResponse) => {
          setFilters(totalResponse.results);
          setPage(1);
        });
      })
      .catch((e) => {
        if (e.statusCode === 404) {
          setExpData([]);
          setTotalEntries(0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [order, orderBy, selectedCampaign, selectedActivity, selectedDate]);

  useEffect(() => {
    setIsLoading(true);

    fetchExpFromAPI((page - 1) * limit)
      .catch((e) => {
        if (e.statusCode === 404) {
          setExpData([]);
          setTotalEntries(0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [limit, page]);

  return {
    data: {
      current: data,
      set: setData,
    },
    campaigns: {
      current: campaigns,
      selected: selectedCampaign,
      set: setCampaigns,
      setSelected: setSelectedCampaign,
    },
    activities: {
      current: activities,
      selected: selectedActivity,
      set: setActivities,
      setSelected: setSelectedActivity,
    },
    dates: {
      current: dates,
      selected: selectedDate,
      set: setDates,
      setSelected: setSelectedDate,
    },
    page: {
      current: page,
      set: setPage,
    },
    order: {
      current: order,
      set: setOrder,
    },
    orderBy: {
      current: orderBy,
      set: setOrderBy,
    },
    limit: {
      current: limit,
      set: setLimit,
    },
    totalEntries: totalEntries,
    loading: isLoading,
  };
};
