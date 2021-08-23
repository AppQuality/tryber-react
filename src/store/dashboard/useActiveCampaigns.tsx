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
  const [orderBy, setOrderBy] = useState<"endDate" | "startDate">("endDate");

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
          let bugformLink = "#";
          if (
            typeof cp.bugform_link !== "boolean" &&
            typeof cp.bugform_link !== "undefined"
          ) {
            if (i18n.language === "en" && cp.bugform_link.en)
              bugformLink = cp.bugform_link.en;
            if (i18n.language === "it" && cp.bugform_link.it)
              bugformLink = cp.bugform_link.it;
          }

          return {
            key: cp.id ? cp.id : 123,
            campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
            startDate: dateFormatter(cp.dates.start),
            endDate: dateFormatter(cp.dates.end),
            actions: {
              title: ``,
              content:
                manualLink === "#" ? (
                  <Button
                    as="a"
                    disabled={true}
                    href={`#`}
                    type="link"
                    size="sm"
                  >
                    {t("Coming soon...")}
                  </Button>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      as="a"
                      href={`${window.location.origin}${manualLink}`}
                      type="link"
                      size="sm"
                    >
                      {t("Read manual")}
                    </Button>
                    {cp.bugform_link === false ? null : (
                      <Button
                        as="a"
                        disabled={cp.bugform_link === false}
                        href={`${window.location.origin}/${bugformLink}`}
                        type="link"
                        size="sm"
                      >
                        {t("Report a bug")}
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
