import { Button, Card, Text } from "@appquality/appquality-design-system";
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
  return (
    <Card title={"Come scalare di livelli"} shadow>
      <Text className="aq-mb-2">
        {
          "Guadagna ogni mese un numero minimo di exp per mantenere o avanzare di livello:"
        }
      </Text>
      <Experience
        icon={doubleArrow}
        alt={"Mantenimento"}
        description={"Mantenimento"}
      />
      <Experience
        icon={arrow}
        alt={"Avanzamento"}
        description={"Avanzamento"}
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
                  ? "Il livello di partenza"
                  : isLast
                  ? "Il livello più alto: 100000 exp e sarà tuo per sempre!"
                  : undefined
              }
              levelSize={isLast ? "large" : "medium"}
            />
          );
        })}
      </div>
      <Text className="aq-mt-2 aq-mb-3">
        {"Domande o dubbi su come funziona la classifica?"}
      </Text>
      <Button forwardedAs="a" type="info" size="block" target="_blank" flat>
        {"Leggi il regolamento"}
      </Button>
    </Card>
  );
};
