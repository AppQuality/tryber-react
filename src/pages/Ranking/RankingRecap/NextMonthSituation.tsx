import { Text, Title } from "@appquality/appquality-design-system";
import { ArrowLeftRight, ArrowRight } from "react-bootstrap-icons";
import { Trans } from "react-i18next";
import starIcon from "src/pages/Ranking/assets/star.svg";
import graphIcon from "src/pages/Ranking/assets/graphIcon.svg";
import styled from "styled-components";
import localizedUrl from "src/utils/localizedUrl";

const StyledRecap = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.gray200};
  margin-top: ${(p) => p.theme.grid.sizes["4"]};
  padding-top: ${(p) => p.theme.grid.sizes["3"]};
  text-align: center;
  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    border-top: 0;
    margin-top: 0;
    padding-top: ${(p) => p.theme.grid.sizes["4"]};
    border-left: 1px solid ${(p) => p.theme.colors.gray200};
    margin-left: ${(p) => p.theme.grid.sizes["3"]};
    padding-left: ${(p) => p.theme.grid.sizes["4"]};
    text-align: left;
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
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
  const getMaintenanceMessage = (
    rankingSummary: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"]
  ) => {
    if (rankingSummary.level.id === 0) {
      return (
        <Trans
          i18nKey="not calculated:::__RANKING_PROGRESS_NOLVEL_HOLDLVL_MAX: 20"
          defaults={"not calculated"}
        />
      );
    }
    if (rankingSummary.level.id === 10) {
      return (
        <Trans
          i18nKey="__RANKING_PROGRESS_BASIC_HOLDLVL_MAX: 50"
          defaults={"start from Basic to climb the ladder"}
        />
      );
    }
    if (rankingSummary.prospect.maintenance) {
      return (
        <Trans
          i18nKey="<bold>{{pointsToKeepLevel}}</bold> points to keep level:::__RANKING_PROGRESS_HOLDLVL_POINTS_MAX: 70"
          values={{
            pointsToKeepLevel: rankingSummary.prospect.maintenance,
          }}
          components={{ bold: <strong className="aq-text-primary" /> }}
          count={rankingSummary.prospect.maintenance}
          defaults={"<bold>{{pointsToKeepLevel}}</bold> points to keep level"}
        />
      );
    }
    return (
      <Trans
        i18nKey="<bold>0</bold> exp points to keep level. <bold>Great, you did it!</bold>:::__RANKING_PROGRESS_HOLDLVL_REACHED_MAX: 70"
        components={{ bold: <strong className="aq-text-primary" /> }}
        defaults={
          "<bold>0</bold> exp points to keep level. <bold>Great, you did it!</bold>"
        }
      />
    );
  };
  return (
    <StyledRecap>
      <Title size="s" className="aq-mb-2">
        <Trans
          i18nKey="__RANKING_PROGRESS_MONTH_MAX: 35"
          defaults="your monthly progress"
        />
      </Title>
      <Text className="aq-mb-2">
        <img
          src={starIcon}
          alt={rankingSummary.points.toString()}
          style={{ verticalAlign: "top", height: "1.5rem", width: "1.5rem" }}
        />
        <span className="aq-ml-1">
          <Trans
            i18nKey="<bold>{{points}}</bold> exp points:::__RANKING_PROGRESS_POINTS_MAX: 25"
            values={{ points: rankingSummary.points }}
            components={{ bold: <strong className="aq-text-primary" /> }}
            defaults={"<bold>{{points}}</bold> exp points"}
          />
        </span>
      </Text>
      <Text className="aq-mb-3">
        <img
          src={graphIcon}
          alt={rankingSummary.rank.toString()}
          style={{ verticalAlign: "top", height: "1.5rem", width: "1.5rem" }}
        />
        <span className="aq-ml-1">
          <Trans
            i18nKey="<bold>{{rank}}</bold> in {{level}} ranking:::__RANKING_POSITION_MAX: 30"
            values={{
              rank: rankingSummary.rank,
              level: rankingSummary.level.name,
            }}
            components={{ bold: <strong className="aq-text-primary" /> }}
            defaults={"<bold>{{rank}}</bold> in {{level}} ranking"}
          />
        </span>
      </Text>
      <Text className="aq-mb-3">
        <ArrowLeftRight style={{ verticalAlign: "top" }} size="1.5rem" />
        <span className="aq-ml-1">{getMaintenanceMessage(rankingSummary)}</span>
      </Text>
      {rankingSummary.prospect.next?.points && (
        <Text className="aq-mb-3">
          <ArrowRight style={{ verticalAlign: "top" }} size="1.5rem" />
          <span className="aq-ml-1">
            {rankingSummary.level.id === 0 ? (
              <Trans
                i18nKey="not calculated:::__RANKING_PROGRESS_NOLVEL_NEXTLVL_MAX: 20"
                defaults={"not calculated"}
              />
            ) : (
              <Trans
                i18nKey="<bold>{{pointsToAdvance}}</bold> points to advance to level {{nextLevel}}:::__RANKING_PROGRESS_NEXTLVL_POINTS_MAX: 70"
                values={{
                  pointsToAdvance: rankingSummary.prospect.next?.points,
                  nextLevel: rankingSummary.prospect.next?.level.name,
                }}
                components={{ bold: <strong className="aq-text-primary" /> }}
                count={rankingSummary.prospect.next?.points}
                defaults={
                  "<bold>{{pointsToAdvance}}</bold> points to advance to level {{nextLevel}}"
                }
              />
            )}
          </span>
        </Text>
      )}
      <Text>
        {rankingSummary.level.id === 0 ? (
          <Trans
            i18nKey=":::let's see what tryber you are with the <link>entry test</link>__RANKING_PROGRESS_NOLEVEL_MAX: 60"
            defaults={
              "let's see what tryber you are with the <link>entry test</link>"
            }
            components={{
              link: (
                <a
                  className="no-level-link"
                  href={localizedUrl(`/courses/16`)}
                />
              ),
            }}
          />
        ) : (
          <Trans
            i18nKey="{{days}} days left to give your best!:::__RANKING_PROGRESS_COUNTDOWN_MAX: 50"
            values={{
              days: getRemainingDaysInMonth(),
            }}
            defaults={"{{days}} days left to give your best!"}
            tOptions={{ count: getRemainingDaysInMonth() }}
          />
        )}
      </Text>
    </StyledRecap>
  );
};
