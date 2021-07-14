import { Card, Text } from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";
import { CardListItemsProps } from "../_types";

const CardListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .card-list-item {
    padding: 30px;
    width: 314px;
  }
  .item-icon {
    font-size: 40px;
  }
`;

export const CardList = ({ items }: CardListItemsProps) => {
  return (
    <CardListStyle className="aq-text-center">
      {items.map((item) => (
        <div className="card-list-item">
          <Card>
            <div className="item-icon">{item.icon}</div>
            <Text color="success">
              <strong>{item.title}</strong>
            </Text>
            <Text>{item.body}</Text>
          </Card>
        </div>
      ))}
    </CardListStyle>
  );
};
