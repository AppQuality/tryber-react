import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { PageTemplate } from "src/features/PageTemplate";
import {
  fetchLevelInfo,
  fetchRankingSummary,
} from "src/redux/ranking/actionCreator";
import { RankingInfo } from "./RankingInfo";
import { RankingRecap } from "./RankingRecap/RankingRecap";
import { RankingTables } from "./RankingTables";

export default function Ranking() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRankingSummary());
    dispatch(fetchLevelInfo());
  }, []);
  return (
    <PageTemplate
      title={t("__RANKING_TITLE_WELCOM_MAX: 20", { defaultValue: "Ranking" })}
      subtitle={t("__RANKING_SUBTITLE_WELCOME_MAX: 125")}
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
        <BSCol size="col-lg-3">
          <RankingInfo />
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
