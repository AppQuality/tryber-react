import {
  Carousel,
  CarouselNav,
  CarouselSlide,
} from "@appquality/appquality-design-system";
import { useState } from "react";

import { useTimeout } from "./effects/useTimeout";
import SlideBugHunting from "./SlideBugHunting";
import SlideEthicalHacker from "./SlideEthicalHacker";
import SlideMarketReasearch from "./SlideMarketReasearch";
import SlideUxResearch from "./SlideUxResearch";

export const CareerPaths = () => {
  const [current, setCurrent] = useState(0);

  const items = [
    SlideMarketReasearch,
    SlideEthicalHacker,
    SlideBugHunting,
    SlideUxResearch,
  ];
  useTimeout(
    10,
    () => {
      current === items.length - 1 ? setCurrent(0) : setCurrent(current + 1);
    },
    [current]
  );

  return (
    <>
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
    </>
  );
};
