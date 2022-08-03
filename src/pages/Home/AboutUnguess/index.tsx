import { Button, Text, Title } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";

import { ReactComponent as Tryber } from "./assets/tryber.svg";

const SlideContainer = styled.div`
  margin-top: 16px;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    margin-top: 160px;
  }
  ${Text} {
    font-size: 22px;
    line-height: 1.8;
  }
  ${Button} {
    padding: 18px 42px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bolder;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  @media (max-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "left" "right";
  }
`;
const TextContainer = styled.div`
  text-align: center;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    text-align: left;
    padding: 16px 26px 16px 26px;
  }
  ${Title} {
    display: flex;
    align-items: center;
    flex-direction: column;
    .tryber {
      order: -1;
      svg {
        width: 50%;
        margin: 0 auto;
        display: block;
      }
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      flex-direction: row;
      .tryber {
        order: 1;
        svg {
          width: auto;
          margin: 0;
        }
      }
    }
  }
`;
const VideoContainer = styled.div`
  position: relative;
  iframe {
    border-radius: 21px;
    width: 100%;
    height: 100%;
  }
`;

export default () => {
  const { t } = useTranslation();
  return (
    <SlideContainer>
      <TextContainer>
        <Title size="xl" className="text-marker">
          <div>{t("__HOME_TITLE_UNGUESS MAX:40")}</div>
          <div className="tryber">
            <Tryber />
          </div>
        </Title>
        <Text className="aq-my-4 subtitle">
          <Trans
            i18nKey="Available tags : <unguess_link> (Link to unguess), <line_break>:::__HOME_PARAGRAPH_UNGUESS MAX:120"
            components={{
              unguess_link: <a href="https://unguess.io/" target="_blank" />,
              line_break: <br />,
            }}
          />
        </Text>
      </TextContainer>
      <VideoContainer>
        <iframe
          width="500"
          height="294"
          allow="fullscreen"
          src="https://www.youtube.com/embed/3GbEBrUxEfc?rel=0"
        ></iframe>
      </VideoContainer>
    </SlideContainer>
  );
};
