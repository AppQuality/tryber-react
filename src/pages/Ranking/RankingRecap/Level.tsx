import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Text } from "@appquality/appquality-design-system";

export const Level = ({
  level,
  color = "main",
  size = "medium",
}: LevelProps) => {
  const [levelColor, setColor] = useState("");
  const [levelSize, setSize] = useState("");
  useEffect(() => {
    setColor(rankingTheme[level.id][color]);
  }, [level, color]);
  useEffect(() => {
    switch (size) {
      case "medium":
        setSize("1.5rem");
        break;
      case "large":
        setSize("28px");
        break;
    }
  }, [level, size]);
  return (
    <StyledLevel color={levelColor} size={levelSize}>
      <div className="level-icon aq-mr-1">{rankingTheme[level.id].icon}</div>
      <Text>
        {" "}
        <strong className="level-name">{level.name}</strong>
      </Text>
    </StyledLevel>
  );
};

const StyledLevel = styled.div<{ color: string; size: string }>`
  display: flex;
  align-items: center;
  color: ${(p) => p.color};

  .level-icon {
    display: inline-block;
    width: ${(p) => p.size};
    height: ${(p) => p.size};
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
