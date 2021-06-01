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
    let _severities: Option[] = [];
    let _status: Option[] = [];
    results.forEach((res) => {
      if (
        typeof res.campaign === "undefined" ||
        typeof res.status === "undefined" ||
        typeof res.severity === "undefined"
      )
        return;
      if (res.campaign?.id) {
        _campaigns[res.campaign.id] = {
          label: `CP${res.campaign?.id} - ${res.campaign?.name}` || "",
          value: res.campaign.id.toString(),
        };
      }
      if (res.severity?.id) {
        _severities[res.severity.id] = {
          label: res.severity.name || "",
          value: res.severity.id.toString(),
        };
      }
      if (res.status?.id) {
        _status[res.status.id] = {
          label: res.status.name || "",
          value: res.status.id.toString(),
        };
      }
    });

    setCampaigns(_campaigns.filter((el) => el != null).reverse());
    setSeverities(_severities.filter((el) => el != null));
    setStatus(_status.filter((el) => el != null));
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
      _data.push({
        key: i,
        id: res.id,
        severity: res.severity?.name,
        status: status,
        campaign: `CP${res.campaign?.id} - ${res.campaign?.name}`,
        title: res.title,
        action: {
          title: `${window.location.origin}/${
            i18n.language !== "en" ? `${i18n.language}/` : ""
          }bugs/show/${res.id}`,
          content: (
            <Button
              type="link"
              size="sm"
              onClick={() => {
                window.location.href = `${window.location.origin}/${
                  i18n.language !== "en" ? `${i18n.language}/` : ""
                }bugs/show/${res.id}`;
              }}
            >
              view more
            </Button>
          ),
        },
      });
    });
    setData(_data);
  };

  const fetchBugsFromAPI = (start: number) => {
    const query: operations["get-users-me-bugs"]["parameters"]["query"] = {
      order: order,
      orderBy: orderBy,
    };
    if (
      selectedCampaign?.value ||
      selectedStatus?.value ||
      selectedSeverity?.value
    ) {
      query.filterBy = {};
      if (selectedCampaign?.value)
        query.filterBy.campaign = selectedCampaign.value;
      if (selectedStatus?.value) query.filterBy.status = selectedStatus.value;
      if (selectedSeverity?.value)
        query.filterBy.severity = selectedSeverity.value;
    }
    return API.myBugs({
      query: { ...query, limit, start },
    }).then((limitedResponse) => {
      setTotalBugs(limitedResponse.total);
      setBugsData(limitedResponse.results);
      return query;
    });
  };
  /**
   *  on Component Mount
   */
  useEffect(() => {
    setIsLoading(true);

    fetchBugsFromAPI(0)
      .then((query) => {
        return API.myBugs({
          query,
        }).then((totalResponse) => {
          setFilters(totalResponse.results);
          setPage(1);
        });
      })
      .catch((e) => {
        if (e.statusCode === 404) {
          setBugsData([]);
          setTotalBugs(0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [order, orderBy, selectedCampaign, selectedStatus, selectedSeverity]);

  useEffect(() => {
    setIsLoading(true);

    fetchBugsFromAPI((page - 1) * limit)
      .catch((e) => {
        if (e.statusCode === 404) {
          setBugsData([]);
          setTotalBugs(0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [limit, page]);

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
