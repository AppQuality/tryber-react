import { TableType, Button } from "@appquality/appquality-design-system";
import React, { useState, useEffect } from "react";
import { operations } from "../../utils/schema";
import API from "../../utils/api";
import dateFormatter from "../../utils/dateFormatter";
import { useTranslation } from "react-i18next";

export default () => {
  const { i18n, t } = useTranslation();

  const limit = 10;
  const [campaigns, setCampaigns] = useState<TableType.Row[]>([]);
  const [page, setPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const [orderBy, setOrderBy] = useState<"endDate" | "closeDate">("endDate");

  const fetchCampaignsFromApi = (page: number) => {
    return API.myCampaigns({
      query: {
        filterBy: {
          accepted: "1",
          statusId: "1",
          completed: "1",
        },
        order: order,
        orderBy: orderBy == "endDate" ? "end_date" : "close_date",
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
          let manualLink = "#";
          if (typeof cp.manual_link !== "undefined") {
            if (
              i18n.language === "en" &&
              cp.manual_link.en &&
              cp.manual_link.en !== "#"
            )
              manualLink = cp.manual_link.en;
            if (
              i18n.language === "it" &&
              cp.manual_link.it &&
              cp.manual_link.it !== "#"
            )
              manualLink = cp.manual_link.it;
          }
          return {
            key: cp.id ? cp.id : 123,
            campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
            endDate: dateFormatter(cp.dates.end),
            closeDate: dateFormatter(cp.dates.close),
            actions: {
              title: ``,
              content: (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {manualLink === "#" ? (
                    <Button
                      as="a"
                      disabled={true}
                      href={`#`}
                      type="link"
                      size="sm"
                    >
                      {t("Coming soon")}
                    </Button>
                  ) : (
                    <Button
                      as="a"
                      href={`${window.location.origin}${manualLink}`}
                      type="link"
                      size="sm"
                    >
                      {t("Read manual")}
                    </Button>
                  )}
                </div>
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
