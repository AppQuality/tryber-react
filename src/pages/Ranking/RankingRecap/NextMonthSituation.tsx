import {
  aqBootstrapTheme,
  Button,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import i18next from "i18next";
import { ReactNode } from "react";
import { ArrowLeftRight, ArrowRight } from "react-bootstrap-icons";
import { Trans } from "react-i18next";
import graphIcon from "src/pages/Ranking/assets/graphIcon.svg";
import starIcon from "src/pages/Ranking/assets/star.svg";
import localizedUrl from "src/utils/localizedUrl";
import styled from "styled-components";
import { ProgressRanking } from "./ProgressRanking/ProgressRanking";

const StyledRecap = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.gray200};
  margin-top: ${(p) => p.theme.grid.sizes["4"]};
  padding-top: ${(p) => p.theme.grid.sizes["3"]};
  text-align: center;

  .pb0 {
    padding-bottom: 0;
  }

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

const StyledProgress = styled.div`
  margin-bottom: 2em;

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    margin-right: ${(p) => p.theme.grid.sizes["3"]};
    margin-bottom: 0;
  }
`;

export const NextMonthSituation = ({
  rankingSummary,
  levelsList,
}: UserRankProps) => {
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
            level: rankingSummary.level.name,
          }}
          components={{ bold: <strong className="aq-text-primary" /> }}
          tOptions={{ count: rankingSummary.prospect.maintenance }}
          count={rankingSummary.prospect.maintenance}
          defaults={
            "<bold>{{pointsToKeepLevel}}</bold> points to keep level <bold>{{level}}</bold>"
          }
        />
      );
    }
    return (
      <Trans
        i18nKey="<bold>0</bold> exp points to keep level. <bold>Great, you did it!</bold>:::__RANKING_PROGRESS_HOLDLVL_REACHED_MAX: 70"
        components={{ bold: <strong className="aq-text-primary" /> }}
        values={{
          level: rankingSummary.level.name,
        }}
        defaults={
          "<bold>0</bold> exp points to keep level. <bold>Great, you did it!</bold>"
        }
      />
    );
  };

  const getProgressMessage = (): ReactNode => {
    if (rankingSummary.prospect.maintenance) {
      return (
        <Trans
          i18nKey={
            "give your best to keep level {{level}}:::__RANKING_PROGRESS_MESSAGE_UNDER_MAX:70"
          }
          values={{ level: rankingSummary.level.name }}
          components={{ bold: <strong className="aq-text-primary" /> }}
        />
      );
    }
    if (
      rankingSummary.prospect.level.name &&
      rankingSummary.prospect.next?.level.name
    ) {
      return (
        <Trans
          i18nKey={
            "Great, next month you'll be {{level}}, give your best and conquer {{nextLevel}}:::__RANKING_PROGRESS_MESSAGE_OVER_MAX:70"
          }
          values={{
            level: rankingSummary.prospect.level.name,
            nextLevel: rankingSummary.prospect.next?.level.name,
          }}
          components={{ bold: <strong className="aq-text-primary" /> }}
        />
      );
    }
    return (
      <Trans
        i18nKey="{{days}} days left to give your best!:::__RANKING_PROGRESS_COUNTDOWN_MAX: 50"
        values={{
          days: getRemainingDaysInMonth(),
        }}
        count={getRemainingDaysInMonth()}
        defaults={"{{days}} days left to give your best!"}
        tOptions={{ count: getRemainingDaysInMonth() }}
      />
    );
  };

  const getCurrentMonth = () =>
    new Date().toLocaleString(i18next.language, { month: "long" });

  const getLastDayMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  };

  const isDesktop = window.matchMedia(
    `only screen and (min-width: ${aqBootstrapTheme.grid.breakpoints.lg})`
  ).matches;

  return (
    <StyledRecap>
      <Title size="s" className="aq-mb-2">
        <Trans
          i18nKey="__RANKING_PROGRESS_MONTH_MAX: 35"
          defaults="your monthly progress"
        />
      </Title>
      <Text className="aq-mb-3" small>
        <Trans
          i18nKey="The level reached by {{currentMonth}} {{lastDayMonth}} will be updated the following month:::__RANKING_RECAP_DESCRIPTION_"
          defaults="Earn the experience points you need to not downgrade, keep your level and move on to the next one. The level reached by {{currentMonth}} {{lastDayMonth}} will be updated the following month."
          values={{
            lastDayMonth: getLastDayMonth(),
            currentMonth: getCurrentMonth(),
          }}
        />
      </Text>
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
            tOptions={{ count: rankingSummary.points }}
            count={rankingSummary.points}
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
          {rankingSummary.level.id === 0 ? (
            <Trans
              i18nKey="not in ranking:::__RANKING_POSITION_NOLeVEL_MAX: 30"
              defaults={"not in ranking"}
            />
          ) : (
            <Trans
              i18nKey="<bold>{{rank}}</bold> in {{level}} ranking:::__RANKING_POSITION_MAX: 30"
              values={{
                rank: rankingSummary.rank,
                level: rankingSummary.level.name,
              }}
              components={{ bold: <strong className="aq-text-primary" /> }}
              defaults={"<bold>{{rank}}</bold> in {{level}} ranking"}
            />
          )}
        </span>
      </Text>
      {rankingSummary.prospect.level.id !== 100 && (
        <Text className="aq-mb-2">
          <ArrowLeftRight style={{ verticalAlign: "top" }} size="1.5rem" />
          <span className="aq-ml-1">
            {getMaintenanceMessage(rankingSummary)}
          </span>
        </Text>
      )}
      {rankingSummary.level.id === 0 ? (
        <Text className="aq-mb-3">
          <ArrowRight style={{ verticalAlign: "top" }} size="1.5rem" />
          <span className="aq-ml-1">
            <Trans
              i18nKey="not calculated:::__RANKING_PROGRESS_NOLVEL_NEXTLVL_MAX: 20"
              defaults={"not calculated"}
            />
          </span>
        </Text>
      ) : (
        rankingSummary.prospect.next?.points && (
          <Text className="aq-mb-3">
            <ArrowRight style={{ verticalAlign: "top" }} size="1.5rem" />
            <span className="aq-ml-1">
              <Trans
                i18nKey="<bold>{{pointsToAdvance}}</bold> points to advance to level {{nextLevel}}:::__RANKING_PROGRESS_NEXTLVL_POINTS_MAX: 70"
                values={{
                  pointsToAdvance: rankingSummary.prospect.next?.points,
                  nextLevel: rankingSummary.prospect.next?.level.name,
                }}
                components={{ bold: <strong className="aq-text-primary" /> }}
                tOptions={{ count: rankingSummary.prospect.next?.points }}
                count={rankingSummary.prospect.next?.points}
                defaults={
                  "<bold>{{pointsToAdvance}}</bold> points to advance to level {{nextLevel}}"
                }
              />
            </span>
          </Text>
        )
      )}
      <>
        {rankingSummary.level.id === 0 ? (
          <Text>
            <Trans
              i18nKey="let's see what tryber you are with the <entry_test_link>entry test</entry_test_link>:::__RANKING_PROGRESS_NOLEVEL_MAX: 60"
              defaults={
                "let's see what tryber you are with the <entry_test_link>entry test</entry_test_link>"
              }
              components={{
                entry_test_link: (
                  <a
                    className="no-level-link"
                    href={localizedUrl(`/courses/16`)}
                  />
                ),
              }}
            />
          </Text>
        ) : (
          <>
            <StyledProgress className="aq-mt-4">
              <ProgressRanking
                levelsList={levelsList}
                prospectLevelId={rankingSummary.prospect.level.id}
                isComplete={rankingSummary.level.id === 100}
              />
            </StyledProgress>
            <Text small>
              {rankingSummary.level.id !== 100 &&
              rankingSummary.prospect.level.id !== 100 ? (
                getProgressMessage()
              ) : rankingSummary.level.id === 100 ? (
                <Trans
                  i18nKey="available tags: <br>, <bold>:::__RANKING_PROGRESS_EMPATHY_STATE_YOU-ARE-LEGENDARY_MAX:100"
                  defaults={
                    "Flying! You are Legendary and you will always be!<br>Keep earning points and stay on top."
                  }
                  components={{
                    br: <br />,
                    bold: <strong className="aq-text-primary" />,
                  }}
                />
              ) : (
                <Trans
                  i18nKey="available tags: <br>, <bold>:::__RANKING_PROGRESS_EMPATHY_STATE_YOU-WILL-BE-LEGENDARY_MAX:100"
                  defaults={
                    "Congratulations you have managed to advance until you get to Legendary, from next month you will be officially legend!"
                  }
                  components={{
                    br: <br />,
                    bold: <strong className="aq-text-primary" />,
                  }}
                />
              )}
            </Text>
          </>
        )}
        {!isDesktop && (
          <Button
            className="aq-mt-4 pb0"
            type="link"
            onClick={() => {
              const elements =
                document.getElementsByClassName("ranking-info-card");
              elements[0]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <Trans
              i18nKey="__RANKING_PROGRESS_LEGEND_LINK"
              defaults={"Read the levels legend"}
            />
          </Button>
        )}
      </>
    </StyledRecap>
  );
};
