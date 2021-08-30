import styled from "styled-components";

export const OnBoardingSlide = styled.div`
  // max height now is 100vh - some invented/guessed number - margins (16+16) - title  - nav dots - margin-bottom of the slide
  max-height: calc(100vh - (120px + 32px + 42px + 15px + 16px));
  overflow: scroll;
  .main-img {
    position: relative;
    height: 300px;
    background-image: var(--mobile-bg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      height: auto;
      background-image: var(--desktop-bg);
    }
  }
  .main-text {
  }
  .onboardingCTA {
    text-align: center;
    width: 100%;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      width: auto;
    }
  }
`;
