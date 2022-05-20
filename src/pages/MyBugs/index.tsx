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
  updateMybugsPagination,
} from "../../redux/myBugs/actionCreator";
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

  const coloredStatus = (statusId: number | undefined) => {
    switch (statusId) {
      case 1:
        return "aq-text-danger";
      case 2:
        return "aq-text-success";
      case 3:
        return "aq-text-info";
      case 4:
        return "aq-text-warning";
      default:
        break;
    }
    return "";
  };

  const { bugsList, campaigns, severities, status } = useSelector(
    (state: GeneralState) => state.myBugs,
    shallowEqual
  );

  // useEffect(() => {
  //   const values = queryString.parse(search);
  //   if (values.cp) {
  //     campaigns.setSelected({ value: values.cp.toString(), label: "" });
  //   }
  //   if (values.status) {
  //     status.setSelected({ value: values.status.toString(), label: "" });
  //   }
  // }, [queryString]);

  const { results, limit, total, start, order, orderBy } = bugsList;

  // update datasource for the table
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
