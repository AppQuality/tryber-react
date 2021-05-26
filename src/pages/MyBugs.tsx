import React, { useEffect, useState } from "react";
import { Container, BSGrid, BSCol } from "../stories/layout/Layout";
import { Card } from "../stories/card/Card";
import Spinner from "../stories/spinner/Spinner";
import { SmallTitle } from "../stories/typography/Typography";
import { useTranslation } from "react-i18next";
import API from "../utils/api";
import styled from "styled-components";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { Table } from "../stories/table/Table";
import { Option } from "../stories/select/_types";
import { Select } from "../stories/select/Select";
import { Row } from "../stories/table/_types";
import { Button } from "../stories/button/Button";

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
  const [data, setData] = useState<Row[]>([]);
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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      long: true,
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "110px",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        //const res = await API.campaigns();
        const response = {
          results: [
            {
              id: 1,
              severity: {
                id: 1,
                name: "LOW",
              },
              status: {
                id: 1,
                name: "Refused",
              },
              campaign: {
                name: "UX test for a selfdrive service",
                id: 1,
              },
              title: "Self drive system crashing",
            },
          ],
          limit: 5,
          size: 1,
          start: 10,
          total: 100,
        };
        const data = response.results.map((res, i) => ({
          key: i,
          id: res.id,
          severity: res.severity.name,
          status: res.status.name,
          campaign: res.campaign.name,
          title: res.title,
          action: (
            <Button type="link" size="sm">
              view more
            </Button>
          ),
        }));
        setData(data);
      } catch (e) {
        alert(e.message);
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
            <SmallTitle as="h5">{t("loading")}</SmallTitle>
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
