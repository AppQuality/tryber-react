import { Text } from "@appquality/appquality-design-system";
import { BaseProps } from "@appquality/appquality-design-system/dist/shared/_types";
import React from "react";
import styled from "styled-components";

interface PerformanceRowProps extends BaseProps {
  item: {
    icon: React.ReactNode;
    text: React.ReactNode;
    val?: React.ReactNode;
    link?: string;
    booty?: React.ReactNode;
  };
}

const StatisticComponent = ({ item, className }: PerformanceRowProps) => {
  return (
    <div className={`${className} aq-mb-3`}>
      {item.icon && <div className="performance-icon aq-mr-3">{item.icon}</div>}
      <Text className="performance-text aq-mr-3">{item.text}</Text>
      <Text className="performance-val">
        {item.val ? <strong>{item.val}</strong> : item.booty}
      </Text>
    </div>
  );
};

const GoToBlockComponent = ({ item, className }: PerformanceRowProps) => {
  return (
    <a href={item.link} className={`${className} `}>
      <span>{item.text}</span>
      <span className="go-to-icon">{item.icon}</span>
    </a>
  );
};

const iconWidth = "21px";

export const Statistic = styled(StatisticComponent)<{ hasSecondRow?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  .performance-icon {
    flex: 0 0 ${iconWidth};
  }
  .performance-text {
    flex: 1 1 auto;
  }
  .performance-val {
    text-align: right;
    flex: ${(props) => (props.hasSecondRow ? "1 0 100%" : "1 0 auto")};
    color: ${(props) => props.theme.palette.primary};
    .booty {
      display: flex;
      justify-content: space-between;
      gap: ${(props) => props.theme.grid.sizes[2]};
      width: 100%;
      .left {
        text-align: left;
        margin-left: calc(
          ${(props) => props.theme.grid.sizes[3]} + ${iconWidth}
        );
      }
      .right {
        text-align: right;
      }
    }
  }
`;

export const GoToBlock = styled(GoToBlockComponent)`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  .go-to-icon {
    transition: transform 0.1s;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    margin-bottom: ${(props) => props.theme.grid.spacing.default};
    padding-bottom: ${(props) => props.theme.grid.spacing.default};
  }
  &:hover {
    text-decoration: underline;
    .go-to-icon {
      transform: translate3d(20%, 0, 0);
    }
  }
`;
