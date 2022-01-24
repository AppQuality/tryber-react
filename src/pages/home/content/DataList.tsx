import { Text, Title } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { DataListItem } from "src/pages/home/_types";
import testerIcon from "src/pages/home/assets/testers.svg";
import countriesIcon from "src/pages/home/assets/countries.svg";
import campaignsIcon from "src/pages/home/assets/campaigns.svg";
import brandsHelped from "src/pages/home/assets/brandsHelped.svg";
import { useTranslation } from "react-i18next";

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

export const DataList = () => {
  const { t } = useTranslation();
  const data: DataListItem[] = [
    {
      name: t("testers"),
      icon: testerIcon,
      text: "45.000",
    },
    {
      name: t("Countries covered"),
      icon: countriesIcon,
      text: "100",
    },
    {
      name: t("Campaigns delivered"),
      icon: campaignsIcon,
      text: "3.500",
    },
    {
      name: t("Brands helped"),
      icon: brandsHelped,
      text: "150",
    },
  ];
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
