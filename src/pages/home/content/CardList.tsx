import { Card, Text } from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";
import { CardListItemsProps } from "../_types";

const CardListStyle = styled.div`
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px 40px;
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 18px 50px;
    .card-list-item {
      padding-bottom: 35px;
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
        <Card className="card-list-item aq-my-3" key={index}>
          <div className="item-icon">{item.icon}</div>
          <Text color="success" className="aq-mb-3 capitalize-first">
            <strong>{item.title}</strong>
          </Text>
          <Text color="secondary">{item.body}</Text>
        </Card>
      ))}
    </CardListStyle>
  );
};
