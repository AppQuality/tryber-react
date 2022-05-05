import { Button, Card, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import arrow from "./assets/arrow.svg";
import doubleArrow from "./assets/doubleArrow.svg";
import { Experience } from "./Experience";
import { LevelInfoRow } from "./LevelInfoRow";

// TODO Remove
const levelInfo = [
  {
    level: { id: 10, name: "Basic" },
    points: { min: 0, max: 0 },
  },
  {
    level: { id: 20, name: "Bronze" },
    points: { min: 50, max: 100 },
  },
  {
    level: { id: 30, name: "Silver" },
    points: { min: 150, max: 250 },
  },
  {
    level: { id: 40, name: "Gold" },
    points: { min: 300, max: 500 },
  },
  {
    level: { id: 50, name: "Platinum" },
    points: { min: 600, max: 1000 },
  },
  {
    level: { id: 60, name: "Diamond" },
    points: { min: 2000, max: 3000 },
  },
  {
    level: { id: 100, name: "Legendary" },
    points: { min: 0, max: 0 },
  },
];

export const RankingInfo = () => {
  const { t } = useTranslation();

  return (
    <Card
      title={t("__RANKING_LEGEND_TITLE_MAX: 35", {
        defaultValue: "How to level up",
      })}
      shadow
    >
      <Text className="aq-mb-2">
        {
          "Guadagna ogni mese un numero minimo di exp per mantenere o avanzare di livello:"
        }
      </Text>
      <Experience
        icon={doubleArrow}
        alt={t("__RANKING_LEGEND_HOLD_MAX: 15", {
          defaultValue: "Maintenance",
        })}
        description={t("__RANKING_LEGEND_HOLD_MAX: 15", {
          defaultValue: "Maintenance",
        })}
      />
      <Experience
        icon={arrow}
        alt={t("__RANKING_LEGEND_NEXT_MAX: 15", {
          defaultValue: "Advancement",
        })}
        description={t("__RANKING_LEGEND_NEXT_MAX: 15", {
          defaultValue: "Advancement",
        })}
      />
      <div className="aq-mt-3 aq-mb-2">
        {levelInfo.map((l, i) => {
          const isFirst = i === 0;
          const isLast = i === levelInfo.length - 1;
          return (
            <LevelInfoRow
              level={l.level}
              min={l.points.min}
              max={l.points.max}
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
      <Button forwardedAs="a" type="info" size="block" target="_blank" flat>
        {t("__RANKING_LEGEND_QUESTIONS_CTA_MAX: 25", {
          defaultValue: "Read the rules",
        })}
      </Button>
    </Card>
  );
};
