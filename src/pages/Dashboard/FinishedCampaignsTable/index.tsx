import {
  Pagination,
  SortTableSelect,
  Table,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Columns from "./columns";
import useCampaigns from "./useCampaigns";

const CampaignsTable = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const defaultOrder = "DESC";
  const defaultOrderby = "end_date";
  const [order, setOrder] = useState<CampaignOrder>(defaultOrder);
  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderby);
  const limit = 10;

  const { data, campaigns, isLoading } = useCampaigns({
    page: page,
    order: order,
    orderBy: orderBy,
  });
  const columns = Columns({ setOrder, setOrderBy });
  return (
    <>
      <SortTableSelect
        order={order || defaultOrder}
        orderBy={orderBy || defaultOrderby}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={campaigns || []}
        isLoading={isLoading}
        isStriped={true}
        order={order}
        orderBy={orderBy}
        i18n={{
          loading: t("Loading Data"),
          empty: t(
            "There are currently no completed campaigns. You can relax, finish the active ones or apply in the new available campaigns!"
          ),
        }}
        columns={columns}
      />
      {(data?.total || 0) > limit ? (
        <Pagination
          className="aq-pt-3"
          onPageChange={setPage}
          current={page}
          maxPages={Math.ceil((data?.total || 0) / limit)}
        />
      ) : null}
    </>
  );
};

export default CampaignsTable;
