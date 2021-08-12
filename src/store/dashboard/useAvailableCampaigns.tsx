import { TableType, Button } from "@appquality/appquality-design-system";
import React, { useState, useEffect } from "react";
import { operations } from "../../utils/schema";
import API from "../../utils/api";
import { useTranslation } from "react-i18next";

export default () => {
  const { i18n, t } = useTranslation();

  const limit = 10;
  const [campaigns, setCampaigns] = useState<TableType.Row[]>([]);
  const [page, setPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [orderBy, setOrderBy] = useState<"startDate" | "endDate">("startDate");

  const fetchCampaignsFromApi = (page: number) => {
    return API.myCampaigns({
      query: {
        filterBy: {
          completed: "0",
        },
        order: order,
        orderBy: orderBy == "endDate" ? "end_date" : "start_date",
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
          const dateFormatter = (unformatted: string) => {
            let d = new Date(unformatted);
            return d.toLocaleString(i18n.language, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          };
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
          }
          return {
            key: cp.id ? cp.id : 0,
            campaignName: cp.name,
            type: cp.campaign_type,
            startDate: dateFormatter(cp.dates.start),
            endDate: dateFormatter(cp.dates.end),
            actions: {
              title: ``,
              content: (
                <Button
                  disabled={previewLink === "#"}
                  as="a"
                  href={previewLink}
                  type="link"
                  size="sm"
                >
                  {previewLink === "#"
                    ? t("Not available")
                    : cp.applied
                    ? t("Applied")
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
