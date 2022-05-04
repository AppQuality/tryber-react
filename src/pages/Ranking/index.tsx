import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import { RankingRecap } from "./RankingRecap/RankingRecap";
import { RankingTables } from "./RankingTables";
import { fetchRankingSummary } from "src/redux/ranking/actionCreator";
import { useDispatch } from "react-redux";
import { getProfile } from "src/redux/user/actions/getProfile";

export default function Ranking() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRankingSummary());
    dispatch(getProfile());
  }, []);
  return (
    <PageTemplate
      title={t("Leaderboard")}
      subtitle={"Subtitle"}
      route={"leaderboard"}
      shouldBeLoggedIn
    >
      <BSGrid>
        <BSCol size="col-lg-9" className="aq-mb-3">
          <Card>
            <RankingRecap />
            <RankingTables />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3"></BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
