import {
  BSCol,
  BSGrid,
  Button,
  Card,
  TableType,
  Text,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { PageTemplate } from "src/features/PageTemplate";
import { updateExperiencePointsPagination } from "../../redux/experiencePoints/actionCreator";
import { mapActivityName } from "../../redux/experiencePoints/utils";
import { useAppDispatch } from "../../redux/provider";
import dateFormatter from "../../utils/dateFormatter";
import { ExperiencePointsColumns } from "./columns";
import ExperiencePointsFilters from "./ExperiencePointsFilters";
import ExperiencePointsTable from "./ExperiencePointsTable";
import { useGetUsersMeExperienceQuery } from "src/services/tryberApi";

export default function ExperiencePoints() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [columns, setcolumns] = useState<TableType.Column[]>(
    ExperiencePointsColumns(dispatch, t)
  );

  const limit = 25;

  const { selectedActivity, selectedCampaign, selectedDate, search } =
    useSelector((state: GeneralState) => state.experiencePoints, shallowEqual);

  const { order, orderBy, start } = useSelector(
    (state: GeneralState) => state.experiencePoints.expList,
    shallowEqual
  );

  const { data, error, isLoading } = useGetUsersMeExperienceQuery({
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

  const { results, total } = data ?? {};

  const changePagination = (newPage: number) => {
    const newStart = limit * (newPage - 1);
    dispatch(updateExperiencePointsPagination(newStart));
  };

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

  useEffect(() => {
    if (
      selectedCampaign ||
      selectedActivity ||
      selectedDate ||
      search ||
      search === "" ||
      error
    ) {
      changePagination(1);
    }
  }, [selectedCampaign, selectedActivity, selectedDate, search]);

  return (
    <PageTemplate
      title={t("Experience Points")}
      route={"experience-points"}
      shouldBeLoggedIn
    >
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" title={t("History")}>
            <ExperiencePointsTable
              data={!error ? rows : []}
              page={(start ?? 0) / limit + 1}
              setPage={changePagination}
              totalEntries={error ? 1 : total ?? 0}
              limit={limit}
              loading={isLoading}
              columns={columns}
              order={order}
              orderBy={orderBy}
            />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <div className="stick-to-header-lg ">
            <Card className="aq-mb-3" title={t("Filters")} shadow={true}>
              <ExperiencePointsFilters
                search={search}
                selectedCampaign={selectedCampaign}
                selectedActivity={selectedActivity}
                selectedDate={selectedDate}
              />
            </Card>
            <Card shadow={true}>
              <div className="aq-mb-2 aq-text-info">
                <strong>{t("How do experience points work?")}</strong>
              </div>
              <Text className="aq-mb-3">
                {t(
                  "Learn more about how we calculate and attribute experience points."
                )}
              </Text>
              <Button
                forwardedAs="a"
                href={`${t("/discover-experience-points/")}`}
                kind="info"
                size="block"
                flat={true}
              >
                {t("Learn More")}
              </Button>
            </Card>
          </div>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
