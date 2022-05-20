import {
  BSCol,
  BSGrid,
  Button,
  Card,
  TableType,
} from "@appquality/appquality-design-system";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import i18n from "../../i18n";
import {
  fetchMyBugs,
  fetchMyBugsFilters,
  setSelectedCampaign,
  setSelectedStatus,
  updateMybugsPagination,
} from "../../redux/myBugs/actionCreator";
import { coloredStatus } from "../../redux/myBugs/utils";
import { useAppDispatch } from "../../redux/provider";
import { MyBugsColumns } from "./columns";
import MyBugsFilters from "./MyBugsFilters";
import MyBugsTable from "./MyBugsTable";

export default function MyBugs() {
  const { search } = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>(
    MyBugsColumns(setIsLoading, dispatch, t)
  );
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const {
    bugsList,
    campaigns,
    severities,
    status,
    selectedCampaign,
    selectedSeverity,
    selectedStatus,
  } = useSelector((state: GeneralState) => state.myBugs, shallowEqual);

  const { results, limit, total, start, order, orderBy } = bugsList;

  useEffect(() => {
    const values = queryString.parse(search);
    if (values.cp) {
      dispatch(setSelectedCampaign({ value: values.cp.toString(), label: "" }));
    }
    if (values.status) {
      dispatch(
        setSelectedStatus({ value: values.status.toString(), label: "" })
      );
    }
  }, [queryString]);

  useEffect(() => {
    setRows(
      results.map((res) => {
        let status = res.status
          ? {
              title: res.status.name,
              content: (
                <span className={coloredStatus(res.status.id)}>
                  {res.status.name}
                </span>
              ),
            }
          : "unknown";
        return {
          key: res.id,
          id: res.id,
          severity: res.severity?.name,
          status: status,
          campaign: `CP${res.campaign?.id} - ${res.campaign?.name}`,
          title: res.title?.replace(/\\(.)/gm, "$1"),
          action: {
            title: `${window.location.origin}/${
              i18n.language !== "en" ? `${i18n.language}/` : ""
            }bugs/show/${res.id}`,
            content: (
              <Button
                className="aq-nopadding"
                forwardedAs="a"
                href={`${window.location.origin}/${
                  i18n.language !== "en" ? `${i18n.language}/` : ""
                }bugs/show/${res.id}`}
                type="link-hover"
                size="sm"
              >
                {t("View more")}
              </Button>
            ),
          },
        };
      })
    );
  }, [results]);

  useEffect(() => {
    dispatch(fetchMyBugs()).then(() => setIsLoading(false));
    dispatch(fetchMyBugsFilters());
  }, []);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updateMybugsPagination(newStart)).then(() => setIsLoading(false));
  };

  return (
    <PageTemplate title={t("Uploaded Bugs")} route={"my-bugs"} shouldBeLoggedIn>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-3" title={t("Submitted bugs")}>
            <MyBugsTable
              data={rows}
              page={(start || 0) / limit + 1}
              setPage={changePagination}
              totalBugs={total}
              limit={limit}
              loading={isLoading}
              columns={columns}
              order={order}
              orderBy={orderBy}
            />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <Card
            className="stick-to-header-lg aq-mb-3"
            title={t("Filters")}
            shadow={true}
          >
            <MyBugsFilters
              campaigns={campaigns}
              severities={severities}
              status={status}
              selectedCampaign={selectedCampaign}
              selectedSeverity={selectedSeverity}
              selectedStatus={selectedStatus}
              order={order}
              orderBy={orderBy}
              columns={columns}
            />
          </Card>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
