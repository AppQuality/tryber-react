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
  const [orderBy, setOrderBy] = useState<"endDate">("endDate");

  const fetchCampaignsFromApi = (page: number) => {
    return API.myCampaigns({
      query: {
        filterBy: {
          accepted: "1",
          completed: "0",
        },
        order: order,
        orderBy: orderBy == "endDate" ? "end_date" : "name",
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
          return {
            key: cp.id ? cp.id : 123,
            campaigns: cp.name,
            endDate: dateFormatter(cp.dates.end),
            actions: {
              title: ``,
              content: [
                <Button
                  as="a"
                  href={`${window.location.href}${
                    i18n.language !== "it"
                      ? `${cp.manual_link?.en}`
                      : `${cp.manual_link?.it}`
                  }`}
                  type="link"
                  size="sm"
                >
                  {t("Read manual")}
                </Button>,
                <Button
                  as="a"
                  href={`${window.location.host}/${
                    i18n.language !== "it" ? "it/" : ""
                  }bugs/?controller=bugs&action=byCampaign&id=${cp.id}`}
                  type="link"
                  size="sm"
                >
                  {t("Report bug")}
                </Button>,
              ],
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
