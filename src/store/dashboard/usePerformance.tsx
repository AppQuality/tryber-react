import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default () => {
  const [expPoints, setExpPoints] = useState(0);
  const [rank, setRank] = useState(0);
  const [cpCompleted, setCpCompleted] = useState(0);
  const [bugsApproved, setBugsApproved] = useState(0);
  const [allBooty, setAllBooty] = useState(0);
  const [pendingBooty, setPendingBooty] = useState(0);
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
            rank: 0,
            cpCompleted: 0,
            bugsApproved: 0,
            allBooty: 0,
            pendingBooty: 0,
          };
        }
        setExpPoints(data.total_exp_pts);
        setRank(data.rank);
        setCpCompleted(data.attended_cp);
        setBugsApproved(data.approved_bugs);
        setAllBooty(data.booty);
        setPendingBooty(data.pending_booty);
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
