import {
  aqBootstrapTheme,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { ArrowLeftRight, ArrowRight } from "react-bootstrap-icons";
import { Trans } from "react-i18next";
import starIcon from "src/pages/Ranking/assets/star.svg";
import graphIcon from "src/pages/Ranking/assets/graphIcon.svg";
import styled from "styled-components";

const StyledRecap = styled.div`
  border-top: 1px solid ${aqBootstrapTheme.colors.gray200};
  margin-top: ${aqBootstrapTheme.grid.sizes["4"]};
  padding-top: ${aqBootstrapTheme.grid.sizes["3"]};
  text-align: center;
  @media (min-width: ${aqBootstrapTheme.grid.breakpoints.md}) {
    border-top: 0;
    margin-top: 0;
    padding-top: ${aqBootstrapTheme.grid.sizes["4"]};
    border-left: 1px solid ${aqBootstrapTheme.colors.gray200};
    margin-left: ${aqBootstrapTheme.grid.sizes["3"]};
    padding-left: ${aqBootstrapTheme.grid.sizes["4"]};
    text-align: left;
  }
  @media (min-width: ${aqBootstrapTheme.grid.breakpoints.lg}) {
    padding-top: 0;
  }
`;

export const NextMonthSituation = ({ rankingSummary }: UserRankProps) => {
  // get remaining days in month
  const getRemainingDaysInMonth = () => {
    const currentDate = new Date();
    const currentMonthDuration = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    return currentMonthDuration - currentDate.getDate();
  };
  return (
    <StyledRecap>
      <Title size="s" className="aq-mb-2">
        <Trans
          i18nKey="__RANKING_PROGRESS_MONTH_MAX: 35"
          defaults="your monthly progress"
        />
      </Title>
      <Text className="aq-mb-1">
        <img
          src={starIcon}
          alt={rankingSummary.points.toString()}
          style={{ verticalAlign: "top" }}
        />{" "}
        <Trans
          i18nKey="<bold>{{points}}</bold> exp points:::__RANKING_PROGRESS_POINTS_MAX: 25"
          values={{ points: rankingSummary.points }}
          components={{ bold: <strong /> }}
          defaults={"<bold>{{points}}</bold> exp points"}
        />
      </Text>
      <Text className="aq-mb-2">
        <img
          src={graphIcon}
          alt={rankingSummary.rank.toString()}
          style={{ verticalAlign: "top" }}
        />{" "}
        <Trans
          i18nKey="<bold>{{rank}}</bold> in {{level}} ranking:::__RANKING_POSITION_MAX: 30"
          values={{
            rank: rankingSummary.rank,
            level: rankingSummary.level.name,
          }}
          components={{ bold: <strong /> }}
          defaults={"<bold>{{rank}}</bold> in {{level}} ranking"}
        />
      </Text>
      {rankingSummary.prospect.maintenance && (
        <Text className="aq-mb-3">
          <ArrowLeftRight style={{ verticalAlign: "top" }} size="21" />{" "}
          <Trans
            i18nKey="<bold>{{pointsToKeepLevel}}</bold> points to keep level:::__RANKING_PROGRESS_HOLDLVL_POINTS_MAX: 70"
            values={{ pointsToKeepLevel: rankingSummary.prospect.maintenance }}
            components={{ bold: <strong /> }}
            count={rankingSummary.prospect.maintenance}
            defaults={"<bold>{{pointsToKeepLevel}}</bold> points to keep level"}
          />
        </Text>
      )}
      {rankingSummary.prospect.next?.points && (
        <Text className="aq-mb-3">
          <ArrowRight style={{ verticalAlign: "top" }} size="21" />{" "}
          <Trans
            i18nKey="<bold>{{pointsToAdvance}}</bold> points to advance to level {{nextLevel}}:::__RANKING_PROGRESS_NEXTLVL_POINTS_MAX: 70"
            values={{
              pointsToAdvance: rankingSummary.prospect.next?.points,
              nextLevel: rankingSummary.prospect.next?.level.name,
            }}
            components={{ bold: <strong /> }}
            count={rankingSummary.prospect.next?.points}
            defaults={
              "<bold>{{pointsToAdvance}}</bold> points to advance to level {{nextLevel}}"
            }
          />
        </Text>
      )}
      <Text>
        <Trans
          i18nKey="{{days}} days left to give your best!:::__RANKING_PROGRESS_COUNTDOWN_MAX: 50"
          values={{
            days: getRemainingDaysInMonth(),
          }}
          defaults={"{{days}} days left to give your best!"}
          tOptions={{ count: getRemainingDaysInMonth() }}
        />
      </Text>
    </StyledRecap>
  );
};
