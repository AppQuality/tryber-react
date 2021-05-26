import React, { useEffect, useState } from "react";
import { Container, BSGrid, BSCol } from "../stories/layout/Layout";
import { Card } from "../stories/card/Card";
import Spinner from "../stories/spinner/Spinner";
import { H5 } from "../stories/typography/Typography";
import { useTranslation } from "react-i18next";
import API from "../utils/api";
import styled from "styled-components";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { Table } from "../stories/table/Table";
import { Column } from "../stories/table/_types";
import { Option } from "../stories/select/_types";
import { Select } from "../stories/select/Select";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: false,
    tester_id: false,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function MyBugs() {
  //const {user, isLoading} = useUser();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [campaigns, setCampaigns] = useState<Option[]>([]);
  const [severities, setSeverities] = useState<Option[]>([]);
  const [status, setStatus] = useState<Option[]>([]);

  const helmet = () => {
    return (
      <Helmet>
        <title>{t("My Bugs")} - AppQuality Crowd</title>
        <meta property="og:title" content={t("My Bugs")} />
        <meta name="description" content={t("My Bugs")} />
      </Helmet>
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await API.campaigns();
      } catch (e) {
        alert(e.message);
        const dataColumns = columns;
        setData(data);
        setColumns(dataColumns);
      }
    };
    TagManager.dataLayer(tagManagerArgs);
    getData();
  }, []);

  const SpinnerWrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    min-height: 60vh;
  `;
  if (false) {
    return (
      <>
        {helmet}
        <Container>
          <SpinnerWrapper>
            <Spinner />
            <H5>{t("loading")}</H5>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <>
      {helmet}
      <Container>
        <h2>{t("My Bugs")}</h2>
        <BSGrid>
          <BSCol size="col-lg-9 col-xxl-8">
            <Card>
              <Table dataSource={data} columns={columns} />
            </Card>
          </BSCol>
          <BSCol size="col-lg-3 col-xxl-4">
            <Card>
              campaign
              <Select options={campaigns} />
              severity
              <Select options={severities} />
              status
              <Select options={status} />
            </Card>
          </BSCol>
        </BSGrid>
      </Container>
    </>
  );
}
