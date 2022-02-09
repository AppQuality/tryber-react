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

import { useTimeout } from "./effects/useTimeout";
import SlideBugHunting from "./SlideBugHunting";
import SlideEthicalHacker from "./SlideEthicalHacker";
import SlideUxResearch from "./SlideUxResearch";

export const CareerPathsSlider = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const items = [SlideEthicalHacker, SlideBugHunting, SlideUxResearch];
  useTimeout(
    10,
    () => {
      current === items.length - 1 ? setCurrent(0) : setCurrent(current + 1);
    },
    [current]
  );

  return (
    <Container className="aq-py-4 aq-mb-4">
      <Title
        className="text-marker section-title aq-text-primary aq-text-center"
        size="xs"
      >
        {t("title section slider home ")}
      </Title>
      <Text className="aq-mb-4 large-desktop aq-text-center">
        {t(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown."
        )}
      </Text>
      <Carousel
        step={1}
        peekNext={false}
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
        step={1}
        current={current}
        setCurrent={setCurrent}
        totalSlides={items.length}
      ></CarouselNav>
    </Container>
  );
};
