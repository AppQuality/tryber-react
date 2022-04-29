import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import { RankingRecap } from "./RankingRecap/RankingRecap";
import { RankingTables } from "./RankingTables";

export default function Ranking() {
  const { t } = useTranslation();

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
