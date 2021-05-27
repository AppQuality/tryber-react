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
import TesterSidebar from "../features/TesterSidebar";
import { Row } from "../stories/table/_types";
import { Button } from "../stories/button/Button";
import { Pagination } from "../stories/pagination/Pagination";
import { operations } from "../utils/schema";

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
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Row[]>([]);
  const [campaigns, setCampaigns] = useState<Option[]>([]);
  const [severities, setSeverities] = useState<Option[]>([]);
  const [status, setStatus] = useState<Option[]>([]);
  const [maxPages, setMaxPages] = useState<number>(0);

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
  const setStatuses = (
    results: operations["get-users-me-bugs"]["responses"]["200"]["content"]["application/json"]["results"]
  ) => {
    let _data: Row[] = [];
    let _campaigns: Option[] = [];
    let _campaign_ids: number[] = [];
    let _severities: Option[] = [];
    let _severities_ids: number[] = [];
    let _status: Option[] = [];
    let _status_ids: number[] = [];
    results.forEach((res, i) => {
      if (
        typeof res.campaign === "undefined" ||
        typeof res.status === "undefined" ||
        typeof res.severity === "undefined"
      )
        return;
      _data.push({
        key: i,
        id: res.id,
        severity: res.severity?.name,
        status: res.status?.name,
        campaign: res.campaign?.name,
        title: res.title,
        action: (
          <Button type="link" size="sm">
            view more
          </Button>
        ),
      });
      if (res.campaign?.id && _campaign_ids.indexOf(res.campaign.id) < 0) {
        _campaign_ids.push(res.campaign.id);
        _campaigns.push({
          label: res.campaign.name || "",
          value: res.campaign.id.toString(),
        });
      }
      if (res.severity?.id && _severities_ids.indexOf(res.severity.id) < 0) {
        _severities_ids.push(res.severity.id);
        _severities.push({
          label: res.severity.name || "",
          value: res.severity.id.toString(),
        });
      }
      if (res.status?.id && _status_ids.indexOf(res.status.id) < 0) {
        _status_ids.push(res.status.id);
        _status.push({
          label: res.status.name || "",
          value: res.status.id.toString(),
        });
      }
    });
    setData(_data);
    setCampaigns(_campaigns);
    setSeverities(_severities);
    setStatus(_status);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.myBugs({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTIxMDMsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwicGVybWlzc2lvbiI6eyJhZG1pbiI6eyJhcHBxX2J1ZyI6dHJ1ZSwiYXBwcV9jYW1wYWlnbl9kYXNoYm9hcmQiOnRydWUsImFwcHFfY2FtcGFpZ24iOnRydWUsImFwcHFfY291cnNlIjp0cnVlLCJhcHBxX21hbnVhbCI6dHJ1ZSwiYXBwcV9wcmV2aWV3Ijp0cnVlLCJhcHBxX3Byb3NwZWN0Ijp0cnVlLCJhcHBxX3Rhc2tfZGFzaGJvYXJkIjp0cnVlLCJhcHBxX3Rhc2siOnRydWUsImFwcHFfdGVzdGVyX3NlbGVjdGlvbiI6dHJ1ZSwiYXBwcV9tYWlsX21lcmdlIjp0cnVlLCJhcHBxX3ZpZGVvX2Rhc2hib2FyZCI6dHJ1ZSwiYXBwcV9wcm9maWxlIjp0cnVlLCJhcHBxX2N1c3RvbV91c2VyX2ZpZWxkIjp0cnVlLCJhcHBxX2Zpc2NhbF9wcm9maWxlIjp0cnVlLCJhcHBxX2NhbXBhaWduX2NhdGVnb3J5Ijp0cnVlLCJhcHBxX3F1YWxpdHlfYmFkZ2UiOnRydWV9LCJ0ZXN0ZXIiOnsiY2FtcGFpZ25zIjpbMjUxMSw0NjIsMjU1NCwyNjMwLDI2NDgsMjY5MSwyNjkyLDI4ODddfX0sImlhdCI6MTYyMjEwNjAxOCwiZXhwIjoxNjIyMTA2OTE4fQ.D_15L3hz021guKQ5WadKNdMVjP-bKhWawW_LdKv77Jc",
        });
        setStatuses(response.results);
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
        <TesterSidebar>
          <Container>
            <SpinnerWrapper>
              <Spinner />
              <SmallTitle as="h5">{t("loading")}</SmallTitle>
            </SpinnerWrapper>
          </Container>
        </TesterSidebar>
      </>
    );
  }
  return (
    <>
      {helmet}
      <TesterSidebar>
        <Container>
          <h2>{t("My Bugs")}</h2>
          <BSGrid>
            <BSCol size="col-lg-9 col-xxl-8">
              <Card>
                <Table dataSource={data} columns={columns} />
                <Pagination
                  onPageChange={() => {
                    alert("change");
                  }}
                  current={0}
                  maxPages={maxPages}
                />
              </Card>
            </BSCol>
            <BSCol size="col-lg-3 col-xxl-4">
              <Card>
                campaign
                <Select options={campaigns} isSearchable />
                severity
                <Select options={severities} isSearchable={false} />
                status
                <Select options={status} isSearchable={false} />
              </Card>
            </BSCol>
          </BSGrid>
        </Container>
      </TesterSidebar>
    </>
  );
}
