import { Text, Title } from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";

const SlideContainer = styled.div`
  ${Title} {
    color: #ffdc17;
    &.disclaimer {
      font-size: 20px;
    }
  }
  ${Text} {
    color: #fff;
    font-size: 22px;
    line-height: 1.8;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary};
  @media (max-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "left" "right";
  }
`;
const TextSlideContainer = styled.div`
  padding: 16px 26px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;
const ImageSlideContainer = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
`;

export default ({
  children,
  image,
}: {
  children: React.ReactNode;
  image: React.ReactNode;
}) => {
  return (
    <SlideContainer>
      <TextSlideContainer>{children}</TextSlideContainer>
      <ImageSlideContainer>{image}</ImageSlideContainer>
    </SlideContainer>
  );
};

export const iconStyle = {
  fontSize: "50px",
  color: "#000",
  marginRight: "10px",
};
export const TextBox = styled.div`
  position: absolute;
  width: 43%;
  height: 18%;
  border-radius: 10px;
  padding: 15px;
  font-weight: bold;
  background: #fff;
  display: flex;
  align-items: center;
`;
