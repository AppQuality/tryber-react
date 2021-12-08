import styled from "styled-components";

export const OnBoardingSlide = styled.div`
  overflow: auto;
  ul {
    list-style: disc;
    padding: 1em;
    margin: 1em;
  }
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
