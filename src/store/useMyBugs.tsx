import React, { useEffect, useState } from "react";
import { Row } from "../stories/table/_types";
import { Option } from "../stories/select/_types";
import { operations } from "../utils/schema";
import { Button } from "../stories/button/Button";
import API from "../utils/api";
import TagManager from "react-gtm-module";

export const useMyBugs = () => {
  const [data, setData] = useState<Row[]>([]);
  const [campaigns, setCampaigns] = useState<Option[]>([]);
  const [severities, setSeverities] = useState<Option[]>([]);
  const [status, setStatus] = useState<Option[]>([]);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<"DESC" | "ASC">("DESC");
  const [orderBy, setOrderBy] = useState<
    "id" | "status" | "title" | "campaign"
  >("id");
  const [totalBugs, setTotalBugs] = useState(0);
  const [limit, setLimit] = useState(25);

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

  /**
   *  on Component Mount
   */
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.myBugs({
          query: {
            limit: 25,
            order: order,
            orderBy: orderBy,
          },
        });
        setStatuses(response.results);
        setTotalBugs(response.total);
      } catch (e) {
        alert(e.message);
      }
    };
    getData();
  }, []);

  return {
    data: {
      current: data,
      set: setData,
    },
    campaigns: {
      current: campaigns,
      set: setCampaigns,
    },
    severities: {
      current: severities,
      set: setSeverities,
    },
    status: {
      current: status,
      set: setStatus,
    },
    page: {
      current: page,
      set: setPage,
    },
    order: {
      current: order,
      set: setOrder,
    },
    orderBy: {
      current: orderBy,
      set: setOrderBy,
    },
    limit: {
      current: limit,
      set: setLimit,
    },
    totalBugs: totalBugs,
  };
};
