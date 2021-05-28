import React, { useEffect, useState } from "react";
import { Row } from "../stories/table/_types";
import { Option } from "../stories/select/_types";
import { operations } from "../utils/schema";
import { Button } from "../stories/button/Button";
import API from "../utils/api";
import { useTranslation } from "react-i18next";

export const useMyBugs = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Row[]>([]);
  const [campaigns, setCampaigns] = useState<Option[]>([]);
  const [severities, setSeverities] = useState<Option[]>([]);
  const [status, setStatus] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | undefined>();
  const [selectedSeverity, setSelectedSeverity] = useState<
    Option | undefined
  >();
  const [selectedCampaign, setSelectedCampaign] = useState<
    Option | undefined
  >();
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<"DESC" | "ASC">("DESC");
  const [orderBy, setOrderBy] = useState<
    "id" | "status" | "title" | "campaign"
  >("id");
  const [totalBugs, setTotalBugs] = useState(0);
  const [limit, setLimit] = useState(25);

  const coloredStatus = (statusId: number | undefined) => {
    switch (statusId) {
      case 1:
        return "text-danger";
      case 2:
        return "text-success";
      case 3:
        return "text-primary";
      case 4:
        return "text-warning";
      default:
        break;
    }
    return "";
  };

  const setFilters = (
    results: operations["get-users-me-bugs"]["responses"]["200"]["content"]["application/json"]["results"]
  ) => {
    let _campaigns: Option[] = [];
    let _campaign_ids: number[] = [];
    let _severities: Option[] = [];
    let _severities_ids: number[] = [];
    let _status: Option[] = [];
    let _status_ids: number[] = [];
    results.forEach((res) => {
      if (
        typeof res.campaign === "undefined" ||
        typeof res.status === "undefined" ||
        typeof res.severity === "undefined"
      )
        return;
      if (res.campaign?.id && _campaign_ids.indexOf(res.campaign.id) < 0) {
        _campaign_ids.push(res.campaign.id);
        _campaigns.push({
          label: `CP${res.campaign?.id} - ${res.campaign?.name}` || "",
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
    setCampaigns(_campaigns);
    setSeverities(_severities);
    setStatus(_status);
  };

  const setBugsData = (
    results: operations["get-users-me-bugs"]["responses"]["200"]["content"]["application/json"]["results"]
  ) => {
    let _data: Row[] = [];
    results.forEach((res, i) => {
      if (
        typeof res.campaign === "undefined" ||
        typeof res.status === "undefined" ||
        typeof res.severity === "undefined"
      )
        return;

      let status = res.severity ? (
        <span className={coloredStatus(res.status.id)}>{res.status.name}</span>
      ) : (
        <span>unknown</span>
      );
      _data.push({
        key: i,
        id: res.id,
        severity: res.severity?.name,
        status: status,
        campaign: `CP${res.campaign?.id} - ${res.campaign?.name}`,
        title: res.title,
        action: (
          <Button
            type="link"
            size="sm"
            onClick={() => {
              window.location.href = `${window.location.origin}/${
                i18n.language !== "en" ? "en/" : ""
              }bugs/show/${res.id}`;
            }}
          >
            view more
          </Button>
        ),
      });
    });
    setData(_data);
  };

  /**
   *  on Component Mount
   */
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const query: operations["get-users-me-bugs"]["parameters"]["query"] = {
          order: order,
          orderBy: orderBy,
        };
        if (selectedCampaign || selectedStatus || selectedSeverity) {
          query.filterBy = {};
          if (selectedCampaign)
            query.filterBy.campaign = selectedCampaign.value;
          if (selectedStatus) query.filterBy.status = selectedStatus.value;
          if (selectedSeverity)
            query.filterBy.severity = selectedSeverity.value;
        }
        const limitedResponse = await API.myBugs({
          query: { ...query, limit, start: (page - 1) * limit },
        });
        setTotalBugs(limitedResponse.total);
        setBugsData(limitedResponse.results);
        const totalResponse = await API.myBugs({
          query,
        });
        setFilters(totalResponse.results);
        setIsLoading(false);
      } catch (e) {
        if (e.statusCode === 404) {
          setBugsData([]);
          setTotalBugs(0);
        }
      }
    };
    getData();
  }, [
    order,
    orderBy,
    selectedCampaign,
    selectedStatus,
    selectedSeverity,
    limit,
    page,
  ]);

  return {
    data: {
      current: data,
      set: setData,
    },
    campaigns: {
      current: campaigns,
      selected: selectedCampaign,
      set: setCampaigns,
      setSelected: setSelectedCampaign,
    },
    severities: {
      current: severities,
      selected: selectedSeverity,
      set: setSeverities,
      setSelected: setSelectedSeverity,
    },
    status: {
      current: status,
      selected: selectedStatus,
      set: setStatus,
      setSelected: setSelectedStatus,
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
    loading: isLoading,
  };
};
