import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import tryber from "./assets/tryber.png";

const SlideContainer = styled.div`
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
  padding: 16px 26px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;
const VideoContainer = styled.div`
  position: relative;
  iframe {
    border-radius: 21px;
    width: 100%;
    height: 100%;
  }
  img.tryber {
    position: absolute;
    top: -30%;
    right: -5%;
  }
`;

export const AboutUnguess = () => {
  const { t, i18n } = useTranslation();
  return (
    <SlideContainer>
      <TextContainer>
        <Title size="xl" className="text-marker">
          {t("About Unguess")}
        </Title>
        <Text className="aq-mb-4">
          {t(
            "UNGUESS draws on the power of the TRYBER community to give its clients the insights it needs to make better decisions about its business, products and services. ."
          )}
        </Text>

        <Button
          type="secondary"
          className="aq-mb-4"
          forwardedAs="a"
          href={`${window.location.origin}/${
            i18n.language == "en" ? "" : `${i18n.language}/`
          }getting-started/`}
        >
          {t("JOIN IN TRYBER")}
        </Button>

        <Title size="s" className="text-marker disclaimer">
          {t("It's totally free!")}
        </Title>
      </TextContainer>
      <VideoContainer>
        <iframe
          width="500"
          height="294"
          src="https://www.youtube.com/embed/XHOmBV4js_E?&theme=dark&autohide=2"
        ></iframe>
        <img className="tryber" src={tryber} alt="tryber" />
      </VideoContainer>
    </SlideContainer>
  );
};
