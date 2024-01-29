import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { mapActivityName } from "src/redux/experiencePoints/utils";
import { useGetUsersMeExperienceQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";

const useRows = () => {
  const limit = 25;
  const { t } = useTranslation();

  const { order, orderBy, start } = useSelector(
    (state: GeneralState) => state.experiencePoints.expList,
    shallowEqual
  );
  const { selectedActivity, selectedCampaign, selectedDate, search } =
    useSelector((state: GeneralState) => state.experiencePoints, shallowEqual);

  const {
    data,
    error,
    isLoading: loading,
  } = useGetUsersMeExperienceQuery({
    limit: limit,
    start: start,
    order: order,
    orderBy: orderBy,
    search: search,
    searchBy: "note",
    filterBy: {
      campaign: selectedCampaign?.value,
      activity: selectedActivity?.value,
      date: selectedDate?.value,
    },
  });

  if (error) {
    return {
      rows: [],
      loading: false,
      totalEntries: 0,
    };
  }

  const { results, total } = data ?? {};

  const rows = (results ?? []).map((res) => {
    return {
      key: res.id,
      amount: {
        title: `${res.amount > 0 ? `+${res.amount}` : res.amount}pts`,
        content:
          res.amount === 0 ? (
            <b className="aq-text-primary">{res.amount}pts</b>
          ) : res.amount > 0 ? (
            <b className="aq-text-success">+{res.amount}pts</b>
          ) : (
            <b className="aq-text-danger">{res.amount}pts</b>
          ),
      },
      date: dateFormatter(res.date),
      activity: mapActivityName(res.activity.id, t),
      campaign:
        res.campaign.title && res.campaign.id > 0
          ? `CP${res.campaign.id}`
          : `-`,
      note: res.note?.replace(/\\(.)/gm, "$1"),
    };
  });

  return {
    rows,
    loading,
    totalEntries: total ?? 0,
  };
};

export { useRows };
