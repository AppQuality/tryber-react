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
        <strong style={{ color: rankingTheme[level.id].textColor }}>
          {level.id === 0 ? (
            level.name
          ) : (
            <Trans
              i18nKey="__RANKING_NAME_LEVEL_MAX:25"
              values={{ levelName: level.name }}
              defaults={"__level {{levelName}}__"}
            />
          )}
        </strong>
      </Text>
      <Text className="aq-mb-3" style={{ display: "flex" }}>
        <StarFill
          style={{ verticalAlign: "middle" }}
          color={aqBootstrapTheme.palette.warning}
          size="21"
        />{" "}
        <div className="aq-ml-1">
          <strong className="aq-mr-1">{user?.total_exp_pts}</strong>
          <span className="aq-text-primaryVariant">
            <Trans i18nKey="__RANKING_EXP_POINTS_MAX:25">
              __total exp points__
            </Trans>
          </span>
        </div>
      </Text>
      <Text>
        <Trans
          i18nKey="__RANKING_LAST_MONTH_MAX:25"
          values={{ lastMonth: lastMonth }}
          defaults={"__last month ({{lastMonth}})__"}
        />
        <Level level={previousLevel} />
      </Text>
    </StyledRecap>
  );
};
