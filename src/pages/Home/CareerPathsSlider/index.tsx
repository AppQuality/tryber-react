import {
  Carousel,
  CarouselNav,
  CarouselSlide,
  Container,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SlideBugHunting from "./SlideBugHunting";
import SlideEthicalHacker from "./SlideEthicalHacker";
import SlideUxResearch from "./SlideUxResearch";

const CareerContainer = styled(Container)`
  margin: 120px 0 100px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.grid.breakpoints.md}) {
    margin: 150px 0 170px 0;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.grid.breakpoints.lg}) {
    margin: 200px 0 60px 0;
  }
`;
export default () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const items = [SlideUxResearch, SlideBugHunting, SlideEthicalHacker];

  return (
    <CareerContainer className="aq-py-4">
      <Title
        className="text-marker section-title aq-text-primary aq-text-center aq-mb-3"
        size="xs"
      >
        {t("__HOME_TITLE_GROWTH MAX:40")}
      </Title>
      <Text className="aq-mb-4 aq-pb-2 subtitle aq-text-center">
        {t("__HOME_PARAGRAPH_GROWTH MAX:110")}
      </Text>
      <Carousel
        step={1}
        current={current}
        setCurrent={setCurrent}
        totalSlides={items.length}
      >
        {items.map((Item, index) => (
          <CarouselSlide key={index}>
            <Item />
          </CarouselSlide>
        ))}
      </Carousel>
      <CarouselNav
        className="aq-mt-3"
        step={1}
        current={current}
        setCurrent={setCurrent}
        totalSlides={items.length}
      />
    </CareerContainer>
  );
};
