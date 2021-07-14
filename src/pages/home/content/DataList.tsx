import { Text, Title } from "@appquality/appquality-design-system";
import { DataListProps } from "../_types";
import React from "react";
import styled from "styled-components";

const DataListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .data-list-item {
    max-width: 170px;
  }
  .item-text {
    text-align: center;
  }

  @media all and (min-width: 991px) {
    .data-list-item {
      display: flex;
      align-items: center;
      max-width: 250px;
    }
    .item-image {
      margin-right: ${(props) => props.theme.grid.spacing.default};
    }
    .item-text {
      text-align: left;
    }
  }
`;

export const DataList = ({ data }: DataListProps) => {
  return (
    <DataListStyle className="aq-my-4">
      {data.map((item, index) => (
        <div className="data-list-item" key={index}>
          <div className="item-image">
            <img src={item.icon} alt={item.name} />
          </div>
          <div className="item-text">
            <Title size="m">
              {item.text}
              <span className="aq-text-warning">+</span>
            </Title>
            <Text color="secondary">
              <strong>{item.name}</strong>
            </Text>
          </div>
        </div>
      ))}
    </DataListStyle>
  );
};
