import styled from "styled-components";

export const OnBoardingSlide = styled.div`
  .main-img {
    position: relative;
    &:after {
      width: 100%;
      height: 100%;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 93.23%,
        #ffffff 100%
      );
    }
  }
  .onboardingCTA {
    text-align: center;
    width: 100%;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      width: auto;
    }
  }
`;
