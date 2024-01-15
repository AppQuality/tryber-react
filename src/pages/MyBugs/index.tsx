import {
  BSCol,
  BSGrid,
  Button,
  Card,
} from "@appquality/appquality-design-system";
import queryString from "query-string";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import i18n from "../../i18n";
import {
  setSelectedCampaign,
  setSelectedStatus,
  updateMybugsPagination,
} from "../../redux/myBugs/actionCreator";
import { coloredStatus } from "../../redux/myBugs/utils";
import { useAppDispatch } from "../../redux/provider";
import MyBugsFilters from "./MyBugsFilters";
import MyBugsTable from "./MyBugsTable";
import { useGetUsersMeBugsQuery } from "src/services/tryberApi";

export default function MyBugs() {
  const { search } = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { selectedCampaign, selectedSeverity, selectedStatus } = useSelector(
    (state: GeneralState) => ({
      selectedCampaign: state.myBugs.selectedCampaign,
      selectedSeverity: state.myBugs.selectedSeverity,
      selectedStatus: state.myBugs.selectedStatus,
    }),
    shallowEqual
  );

  const { limit, start, order, orderBy } = useSelector(
    (state: GeneralState) => ({
      limit: state.myBugs.bugsList.limit,
      start: state.myBugs.bugsList.start,
      order: state.myBugs.bugsList.order,
      orderBy: state.myBugs.bugsList.orderBy,
    }),
    shallowEqual
  );

  const { data, isLoading } = useGetUsersMeBugsQuery({
    start: start,
    limit: limit,
    orderBy: orderBy,
    order: order,
    filterBy: {
      campaign: selectedCampaign?.value,
      severity: selectedSeverity?.value,
      status: selectedStatus?.value,
    },
  });
  const { results, total } = data || {};

  const changePagination = (newPage: number) => {
    const newStart = limit * (newPage - 1);
    dispatch(updateMybugsPagination(newStart));
  };

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

  const rows = (results || []).map((res) => {
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
            kind="link-hover"
            size="sm"
          >
            {t("View more")}
          </Button>
        ),
      },
    };
  });

  const columns = MyBugsColumns(dispatch, t);
  return (
    <PageTemplate title={t("Uploaded Bugs")} route={"my-bugs"} shouldBeLoggedIn>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-3" title={t("Submitted bugs")}>
            <MyBugsTable
              data={rows}
              page={(start || 0) / limit + 1}
              setPage={changePagination}
              totalBugs={total ?? 0}
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
              selectedCampaign={selectedCampaign}
              selectedSeverity={selectedSeverity}
              selectedStatus={selectedStatus}
              order={order}
              setPage={changePagination}
              orderBy={orderBy}
              columns={columns}
            />
          </Card>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
