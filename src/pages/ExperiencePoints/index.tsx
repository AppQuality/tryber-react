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
import { useGetUsersMeExperienceQuery } from "src/services/tryberApi";
import {
  fetchExperiencePoints,
  fetchExperiencePointsFilters,
  updateExperiencePointsPagination,
} from "../../redux/experiencePoints/actionCreator";
import { mapActivityName } from "../../redux/experiencePoints/utils";
import { useAppDispatch } from "../../redux/provider";
import dateFormatter from "../../utils/dateFormatter";
import ExperiencePointsFilters from "./ExperiencePointsFilters";
import ExperiencePointsTable from "./ExperiencePointsTable";
import { ExperiencePointsColumns } from "./columns";

export default function ExperiencePoints() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [columns, setcolumns] = useState<TableType.Column[]>(
    ExperiencePointsColumns(dispatch, t)
  );
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const { data } = useGetUsersMeExperienceQuery({});

  const {
    expList,
    campaigns,
    activities,
    dates,
    selectedCampaign,
    selectedActivity,
    selectedDate,
    search,
    isLoading,
  } = useSelector(
    (state: GeneralState) => state.experiencePoints,
    shallowEqual
  );

  const { results, limit, total, start, order, orderBy } = expList;

  const changePagination = (newPage: number) => {
    const newStart = limit * (newPage - 1);
    dispatch(updateExperiencePointsPagination(newStart));
  };

  useEffect(() => {
    setRows(
      results.map((res) => {
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
      })
    );
  }, [results]);

  useEffect(() => {
    if (
      selectedCampaign ||
      selectedActivity ||
      selectedDate ||
      search ||
      search === ""
    ) {
      changePagination(1);
      dispatch(fetchExperiencePointsFilters(t));
    }
  }, [selectedCampaign, selectedActivity, selectedDate, search]);

  useEffect(() => {
    dispatch(fetchExperiencePoints());
    dispatch(fetchExperiencePointsFilters(t));
  }, []);

  return (
    <PageTemplate
      title={t("Experience Points")}
      route={"experience-points"}
      shouldBeLoggedIn
    >
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" title={t("History")}>
            <Button onClick={() => alert("ciao")}>ciao</Button>
            <ExperiencePointsTable
              data={rows}
              page={(start || 0) / limit + 1}
              setPage={changePagination}
              totalEntries={total}
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
                campaigns={campaigns}
                activities={activities}
                dates={dates}
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
