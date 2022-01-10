import { Text, Title } from "@appquality/appquality-design-system";
import { DataListProps } from "../_types";
import styled from "styled-components";

const DataListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .data-list-item {
    flex: 1 0 50%;
    .item-body {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
    }
    .item-image {
      height: 56px;
      max-width: initial;
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      display: flex;
      flex: 1 0 25%;
      justify-content: center;
      .item-body {
        flex-flow: row;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
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
    <DataListStyle>
      {data.map((item, index) => (
        <div className="data-list-item" key={index}>
          <div className="item-body">
            <img
              className="item-image aq-mb-3"
              src={item.icon}
              alt={item.name}
            />
            <div className="item-text aq-mb-3">
              <Title className="text-marker" size="m">
                {item.text}
                <span className="aq-text-secondary">+</span>
              </Title>
              <Text className="capitalize-first">
                <strong>{item.name}</strong>
              </Text>
            </div>
          </div>
        </div>
      ))}
    </DataListStyle>
  );
};
