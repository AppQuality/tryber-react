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
  };
}

const StatisticComponent = ({ item, className }: PerformanceRowProps) => {
  return (
    <div className={`${className} aq-mb-3`}>
      {item.icon && <div className="performance-icon aq-mr-3">{item.icon}</div>}
      <Text className="performance-text aq-text-secondary aq-mr-3">
        {item.text}
      </Text>
      <Text className="performance-val">
        <strong>{item.val}</strong>
      </Text>
    </div>
  );
};

const GoToBlockComponent = ({ item, className }: PerformanceRowProps) => {
  return (
    <a href={item.link} className={`${className} aq-text-info`}>
      <span>{item.text}</span>
      <span className="go-to-icon">{item.icon}</span>
    </a>
  );
};

export const Statistic = styled(StatisticComponent)`
  display: flex;
  .performance-icon {
    flex: 0 0 21px;
  }
  .performance-text {
    flex: 1 1 auto;
  }
  .performance-val {
    text-align: right;
    flex: 1 0 auto;
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
