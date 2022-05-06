import {
  aqBootstrapTheme,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { StarFill } from "react-bootstrap-icons";
import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Level } from "./Level";
import styled from "styled-components";

const StyledRecap = styled.div`
  padding-top: ${aqBootstrapTheme.grid.sizes["4"]};
  @media (min-width: ${aqBootstrapTheme.grid.breakpoints.lg}) {
    padding-top: 0;
  }
`;
export const CurrentSituation = ({ user, rankingSummary }: UserRankProps) => {
  const [lastMonth, setLastMonth] = useState("");
  const { i18n } = useTranslation();
  const { level, previousLevel } = rankingSummary;
  useEffect(() => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    setLastMonth(
      lastMonth.toLocaleDateString(i18n.language, { month: "long" })
    );
  }, [i18n.language]);
  return (
    <StyledRecap>
      <Title size="s">{`${user.name} ${user.surname}`}</Title>
      <Text small className="aq-mb-1">
        {"T" + user.id}
      </Text>
      <Text className="level-name">
        <strong style={{ color: rankingTheme[level.id].main }}>
          {level.id === 0 ? (
            level.name
          ) : (
            <Trans
              i18nKey="level {{levelName}}:::__RANKING_NAME_LEVEL_MAX:25"
              values={{ levelName: level.name }}
              defaults={"level {{levelName}}"}
            />
          )}
        </strong>
      </Text>
      <Text className="aq-mb-3">
        <StarFill
          style={{ verticalAlign: "top" }}
          color={aqBootstrapTheme.colors.orange500}
          size="21"
        />{" "}
        <Trans
          i18nKey="<bold>{{points}}</bold> total exp points:::__RANKING_EXP_POINTS_MAX:25"
          components={{ bold: <strong /> }}
          values={{ points: user?.total_exp_pts }}
          defaults="<bold>{{points}}</bold> total exp points"
        />
      </Text>
      <Text>
        <Trans
          i18nKey="last month ({{lastMonth}}):::__RANKING_LAST_MONTH_MAX:25"
          values={{ lastMonth: lastMonth }}
          defaults={"last month ({{lastMonth}})"}
        />
        <Level level={previousLevel} />
      </Text>
    </StyledRecap>
  );
};
