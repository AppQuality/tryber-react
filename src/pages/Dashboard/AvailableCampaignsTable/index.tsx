import { Pagination, Table } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Columns from "./columns";
import useCampaigns from "./useCampaigns";

const CustomMobileTemplateTable = styled(Table)`
  .table-card {
    grid-template-areas:
      "left overline"
      "left title"
      "left more"
      "left cta";
    grid-template-columns: 24px 1fr;
  }
`;

const CampaignsTable = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const defaultOrder = "ASC";
  const defaultOrderby = "visibility";
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
      <CustomMobileTemplateTable
        dataSource={campaigns || []}
        isLoading={isLoading}
        isStriped={true}
        order={order}
        orderBy={orderBy}
        i18n={{
          loading: t("Loading Data"),
          empty: t(
            "There are no new campaigns available at this time, please keep your profile and devices updated and look forward to new activities."
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
