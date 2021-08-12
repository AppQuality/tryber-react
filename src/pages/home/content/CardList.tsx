import { Card, Text } from "@appquality/appquality-design-system";
import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import { CardListItemsProps } from "../_types";

const tresholdForCardAnimation = 100;

const slideUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardListStyle = styled.div`
  min-height: ${tresholdForCardAnimation +1}px;
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

const CardItem = styled(Card)<{ index: number }>`
  animation-duration: .5s;
  animation-delay: ${({ index }) => index * .2}s;
  animation-fill-mode: both;
  animation-name: ${slideUpAnimation};
`;
export const CardList = ({ items }: CardListItemsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  let ref = useRef<HTMLDivElement>(null);

  const callBack: IntersectionObserverCallback = (entries) => {
    if (entries[0]) setEntry(entries[0]);
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);
  useEffect(() => {
    if (!isVisible && entry && entry.intersectionRect.height > tresholdForCardAnimation) {
      setIsVisible(true);
    }
  }, [entry]);
  return (
    <CardListStyle ref={ref} className='aq-text-center'>
        {isVisible && items.map((item, index) => (
            <CardItem index={index+1} key={index} shadow className="card-list-item aq-my-3">
              <div className="item-icon">{item.icon}</div>
              <Text color="success" className="aq-mb-3 capitalize-first">
                <strong>{item.title}</strong>
              </Text>
              <Text color="secondary">{item.body}</Text>
            </CardItem>
        ))}
    </CardListStyle>
  );
};
