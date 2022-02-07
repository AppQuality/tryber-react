import { Container, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { DataListItem } from "src/pages/home/_types";
import brandsHelped from "src/pages/home/assets/oc-brands.svg";
import campaignsIcon from "src/pages/home/assets/oc-campaigns.svg";
import countriesIcon from "src/pages/home/assets/oc-countries.svg";
import testerIcon from "src/pages/home/assets/oc-trybers.svg";
import styled from "styled-components";

const YellowBox = styled.div`
  background: ${(props) => props.theme.colors.orange600};
`;
const DataListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .data-list-item {
    flex: 1 0 100%;
    .item-body {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;

      ${Title} {
        font-size: 50px;
      }
      ${Text} {
        font-size: 20px;
        font-weight: 400;
      }
    }

    .item-image {
      max-width: initial;
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
      flex: 1 0 50%;
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      flex: 1 0 25%;
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
    <YellowBox className="aq-py-4">
      <Container className="aq-my-4">
        <div className="section-title text-marker aq-my-4 aq-py-4">
          {t("Our Community")}
        </div>
        <DataListStyle className="aq-py-2">
          {data.map((item, index) => (
            <div className="data-list-item" key={index}>
              <div className="item-body aq-mb-4">
                <img
                  className="item-image aq-mb-3"
                  src={item.icon}
                  alt={item.name}
                />

                <Title className="text-marker" size="m">
                  {item.text + "+"}
                </Title>
                <Text className="capitalize-first aq-text-primary">
                  {item.name}
                </Text>
              </div>
            </div>
          ))}
        </DataListStyle>
      </Container>
    </YellowBox>
  );
};
