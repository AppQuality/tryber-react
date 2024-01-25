import { Button, Card, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import arrow from "./assets/arrow.svg";
import doubleArrow from "./assets/doubleArrow.svg";
import { Experience } from "./Experience";
import { LevelInfoRow } from "./LevelInfoRow";

export const RankingInfo = () => {
  const { t } = useTranslation();

  const levelInfo = useSelector(
    (state: GeneralState) => state.ranking.levelInfo,
    shallowEqual
  );

  const expLegendConfig = [
    {
      icon: doubleArrow,
      description: t("__RANKING_LEGEND_HOLD_MAX: 15", {
        defaultValue: "Maintenance",
      }),
      alignTop: true,
    },
    {
      icon: arrow,
      description: t("__RANKING_LEGEND_NEXT_MAX: 15", {
        defaultValue: "Advancement",
      }),
    },
  ];

  return (
    <Card
      className="ranking-info-card"
      title={t("__RANKING_LEGEND_TITLE_MAX: 35", {
        defaultValue: "How to level up",
      })}
      shadow
    >
      {expLegendConfig.map((exp) => (
        <Experience
          key={exp.description}
          icon={exp.icon}
          alt={exp.description}
          description={exp.description}
          alignTop={exp.alignTop}
        />
      ))}
      <div className="aq-mt-3 aq-mb-2">
        {levelInfo?.map((l, i) => {
          const isFirst = i === 0;
          const isLast = i === levelInfo.length - 1;
          return (
            <LevelInfoRow
              key={l.id}
              level={{ id: l.id, name: l.name }}
              hold={l.hold}
              reach={l.reach}
              alternativeText={
                isFirst
                  ? t("__RANKING_LEGEND_BASIC_SPEC_MAX: 35", {
                      defaultValue: "The starting level",
                    })
                  : isLast
                  ? t("__RANKING_LEGEND_LEGENDARY_SPEC_MAX: 70", {
                      defaultValue:
                        "The highest level: reach it and it will be yours forever!",
                    })
                  : undefined
              }
              levelSize={isLast ? "large" : "medium"}
            />
          );
        })}
      </div>
      <Text className="aq-mt-2 aq-mb-3">
        {t("__RANKING_LEGEND_QUESTIONS_MAX: 70", {
          defaultValue: "Questions or doubts about how the ranking works?",
        })}
      </Text>
      <Button
        href={t("Ranking help article", {
          ns: "links",
        })}
        forwardedAs="a"
        kind="info"
        size="block"
        target="_blank"
        flat
      >
        {t("__RANKING_LEGEND_QUESTIONS_CTA_MAX: 25", {
          defaultValue: "Read the rules",
        })}
      </Button>
    </Card>
  );
};
