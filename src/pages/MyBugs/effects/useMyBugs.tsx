import {
  SelectType,
  TableType,
  Button,
} from "@appquality/appquality-design-system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";
import { operations } from "src/utils/schema";

// export type BugsOrderByType = "id" | "status" | "title" | "campaign";

export const useMyBugs = () => {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TableType.Row[]>([]);
  const [campaigns, setCampaigns] = useState<SelectType.Option[]>([]);
  const [severities, setSeverities] = useState<SelectType.Option[]>([]);
  const [status, setStatus] = useState<SelectType.Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    SelectType.Option | undefined
  >();
  const [selectedSeverity, setSelectedSeverity] = useState<
    SelectType.Option | undefined
  >();
  const [selectedCampaign, setSelectedCampaign] = useState<
    SelectType.Option | undefined
  >();
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<OrderType>("DESC");
  const [orderBy, setOrderBy] = useState<BugsOrderByType>("id");
  const [totalBugs, setTotalBugs] = useState(0);
  const [limit, setLimit] = useState(25);

  const coloredStatus = (statusId: number | undefined) => {
    switch (statusId) {
      case 1:
        return "aq-text-danger";
      case 2:
        return "aq-text-success";
      case 3:
        return "aq-text-info";
      case 4:
        return "aq-text-warning";
      default:
        break;
    }
    return "";
  };

  const setFilters = (
    results: operations["get-users-me-bugs"]["responses"]["200"]["content"]["application/json"]["results"]
  ) => {
    let _campaigns: SelectType.Option[] = [];
    let _severities: SelectType.Option[] = [];
    let _status: SelectType.Option[] = [];
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
    let _data: TableType.Row[] = [];
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
              type="link-hover"
              size="sm"
            >
              {t("View more")}
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
    setPage(1);

    fetchBugsFromAPI(0)
      .then((query) => {
        return API.myBugs({
          query,
        }).then((totalResponse) => {
          setFilters(totalResponse.results);
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
  }, [limit, page, selectedCampaign, selectedStatus, selectedSeverity]);

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
