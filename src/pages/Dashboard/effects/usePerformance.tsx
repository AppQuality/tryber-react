import { useEffect, useState } from "react";
import API from "src/utils/api";

export default () => {
  const [expPoints, setExpPoints] = useState(0);
  const [rank, setRank] = useState("0");
  const [cpCompleted, setCpCompleted] = useState(0);
  const [bugsApproved, setBugsApproved] = useState(0);
  const [allBooty, setAllBooty] = useState<
    ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"]["booty"] &
      ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"]["pending_booty"]
  >({
    gross: {
      value: 0,
      currency: "EUR",
    },
  });
  const [pendingBooty, setPendingBooty] = useState<
    ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"]["pending_booty"]
  >({
    gross: {
      value: 0,
      currency: "EUR",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.me(
      "",
      "total_exp_pts,booty,pending_booty,rank,attended_cp,approved_bugs"
    )
      .then((data) => {
        if (!data) {
          return {
            expPoints: 0,
            rank: "N/A",
            cpCompleted: 0,
            bugsApproved: 0,
            allBooty: {
              gross: {
                value: 0,
                currency: "EUR",
              },
            },
            pendingBooty: {
              gross: {
                value: 0,
                currency: "EUR",
              },
            },
          };
        }
        setExpPoints(data.total_exp_pts || 0);
        setRank(data.rank || "N/A");
        setCpCompleted(data.attended_cp || 0);
        setBugsApproved(data.approved_bugs || 0);
        setAllBooty(
          data.booty || {
            gross: {
              value: 0,
              currency: "EUR",
            },
          }
        );
        setPendingBooty(
          data.pending_booty || {
            gross: {
              value: 0,
              currency: "EUR",
            },
          }
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    expPoints,
    rank,
    cpCompleted,
    bugsApproved,
    allBooty,
    pendingBooty,
    loading,
  };
};
