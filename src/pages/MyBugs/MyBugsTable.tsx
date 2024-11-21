import {
  Button,
  Pagination,
  Table,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import i18n from "src/i18n";
import { coloredStatus } from "src/redux/myBugs/utils";
import { useGetUsersMeBugsQuery } from "src/services/tryberApi";
import { useBugColumns } from "./columns";
import { usePage } from "./usePage";

const MyBugsTable = () => {
  const { t } = useTranslation();
  const { page, setPage } = usePage();
  const columns = useBugColumns();

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

  const { data, isLoading: loading } = useGetUsersMeBugsQuery({
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

  const totalBugs = total ?? 0;

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
  return (
    <>
      <Table
        className="aq-mb-3"
        dataSource={rows}
        columns={columns}
        orderBy={orderBy}
        order={order}
        isLoading={loading}
        isStriped
      />
      <Pagination
        className="aq-pt-3"
        onPageChange={setPage}
        current={page}
        maxPages={Math.ceil(totalBugs / limit)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </>
  );
};

export default MyBugsTable;
