import { Button, TableType } from "@appquality/appquality-design-system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";
import dateFormatter from "src/utils/dateFormatter";
import { operations } from "src/utils/schema";

type OrderByType = "startDate" | "endDate";

export default () => {
  const { i18n, t } = useTranslation();

  const limit = 10;
  const [campaigns, setCampaigns] = useState<TableType.Row[]>([]);
  const [page, setPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderType>("ASC");
  const [orderBy, setOrderBy] = useState<OrderByType>("startDate");

  const fetchCampaignsFromApi = (page: number) => {
    return API.myCampaigns({
      query: {
        filterBy: {
          completed: "0",
        },
        order: order,
        orderBy: orderBy === "endDate" ? "end_date" : "start_date",
        limit,
        start: (page - 1) * limit,
      },
    }).then(
      (
        data: operations["get-users-me-campaigns"]["responses"]["200"]["content"]["application/json"]
      ) => {
        if (!data || !data.results) {
          return { results: [], total: 0 };
        }
        const campaigns = data.results.map((cp) => {
          let previewLink = "#";
          if (cp.preview_link) {
            if (
              cp.preview_link.it &&
              i18n.language == "it" &&
              cp.preview_link.it !== "#"
            )
              previewLink = `${window.location.origin}${cp.preview_link.it}`;
            if (
              cp.preview_link.it &&
              i18n.language == "en" &&
              cp.preview_link.en !== "#"
            )
              previewLink = `${window.location.origin}${cp.preview_link.en}`;
            if (
              cp.preview_link.es &&
              i18n.language == "es" &&
              cp.preview_link.es !== "#"
            )
              previewLink = `${window.location.origin}${cp.preview_link.es}`;
          }
          return {
            key: cp.id ? cp.id : 0,
            campaignName: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
            type: cp.campaign_type,
            startDate: dateFormatter(cp.dates.start),
            endDate: dateFormatter(cp.dates.end),
            actions: {
              title: ``,
              content: (
                <Button
                  className="aq-nopadding"
                  disabled={previewLink === "#"}
                  forwardedAs="a"
                  href={previewLink}
                  kind="link-hover"
                  size="sm"
                >
                  {previewLink === "#"
                    ? t("Not available")
                    : cp.applied
                    ? t("View")
                    : t("Apply now")}
                </Button>
              ),
            },
          };
        });
        return {
          results: campaigns,
          total: data.total ? data.total : campaigns.length,
        };
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchCampaignsFromApi(page)
      .then((data) => {
        setCampaigns(data.results);
        setTotalEntries(data.total);
      })
      .catch((e) => {
        if (e.statusCode === 404) {
          setCampaigns([]);
          setTotalEntries(0);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, orderBy, order]);

  return {
    campaigns,
    page: {
      current: page,
      set: setPage,
    },
    totalEntries,
    limit,
    loading,
    order: {
      current: order,
      set: setOrder,
    },
    orderBy: {
      current: orderBy,
      set: setOrderBy,
    },
  };
};
