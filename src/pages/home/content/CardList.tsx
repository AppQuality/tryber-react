import { Card, Text } from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";
import { CardListItemsProps } from "../_types";

const CardListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .card-list-item {
    width: 100%;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      width: 340px;
    }
  }
  .item-icon {
    font-size: 40px;
  }
`;

export const CardList = ({ items }: CardListItemsProps) => {
  return (
    <CardListStyle className="aq-text-center">
      {items.map((item, index) => (
        <div className="card-list-item aq-my-3" key={index}>
          <Card>
            <div className="item-icon">{item.icon}</div>
            <Text color="success" className="aq-mb-3 capitalize-first">
              <strong>{item.title}</strong>
            </Text>
            <Text color="secondary">{item.body}</Text>
          </Card>
        </div>
      ))}
    </CardListStyle>
  );
};
