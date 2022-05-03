import {
  aqBootstrapTheme,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { StarFill } from "react-bootstrap-icons";
import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const CurrentSituation = ({ user, rankingSummary }: UserRankProps) => {
  const [lastMonth, setLastMonth] = useState("");
  const { t, i18n } = useTranslation();
  const { level, previousLevel } = rankingSummary;
  useEffect(() => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    setLastMonth(
      lastMonth.toLocaleDateString(i18n.language, { month: "long" })
    );
  }, [i18n.language]);
  return (
    <div className="aq-pt-3">
      <Title size="ms">{`${user.name} ${user.surname}`}</Title>
      <Text small className="aq-mb-1">
        {"T" + user.id}
      </Text>
      <Text className="level-name">
        <strong style={{ color: rankingTheme[level.id].textColor }}>
          {t("level")} {level.name}
        </strong>
      </Text>
      <Text className="aq-mb-3">
        <StarFill
          style={{ verticalAlign: "middle" }}
          color={aqBootstrapTheme.palette.warning}
          size="21"
        />{" "}
        <div className="aq-ml-2 aq-text-primary">
          <strong className="aq-mr-2">{user?.total_exp_pts}</strong>
          <span className="aq-text-primaryVariant">pt</span>
        </div>
      </Text>
      <Text>
        last month ({lastMonth})
        <div style={{ color: rankingTheme[previousLevel.id].main }}>
          <span>{rankingTheme[previousLevel.id].icon}</span>-
          {previousLevel.name}
        </div>
      </Text>
    </div>
  );
};
