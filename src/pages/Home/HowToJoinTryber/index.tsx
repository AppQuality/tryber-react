import { Container, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../_components/JoinInButton";
import { ReactComponent as Alarm } from "./assets/alarm.svg";
import background from "./assets/background.png";
import { ReactComponent as Devices } from "./assets/devices.svg";
import { ReactComponent as List } from "./assets/list.svg";
import { ReactComponent as Wallet } from "./assets/wallet.svg";
import GenericCard from "./GenericCard";

const JoinTryberContainer = styled.div`
  padding: 90px 0;
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.lg}) {
    padding: 90px 80px;
  }
  background: url(${background}) no-repeat;
  background-size: cover;
  background-position: 1%;
  ${Title},${Text} {
    color: #fff;
  }
  ${Title}.main {
    font-size: 50px;
  }
  ${Text}.claim {
    font-size: 22px;
  }
  .cardlist {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    margin-bottom: 32px;
    flex-direction: column;
    @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
      margin-bottom: 120px;
      flex-direction: row;
    }
  }

  ${GenericCard} {
    width: 100%;
    margin: 16px 0;
    @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}) {
      margin: 0;
      width: 23.5%;
    }
  }
`;

export default () => {
  const { t } = useTranslation();
  return (
    <JoinTryberContainer>
      <Container>
        <Title
          size="l"
          className="main text-marker aq-text-center aq-mt-3 aq-mb-2"
        >
          {t("__HOME_TITLE_STEP MAX:40")}
        </Title>
        <Text className="aq-text-center claim">
          {t("__HOME_PARAGRAPH_STEP MAX:110")}
        </Text>
        <div className="cardlist">
          <GenericCard
            icon={<Devices />}
            title={t("__HOME_TITLE_CARD_STEP1 MAX:20")}
          >
            {t("__HOME_PARAGRAPH_CARD_STEP1 MAX:65")}
          </GenericCard>
          <GenericCard
            icon={<Alarm />}
            title={t("__HOME_TITLE_CARD_STEP2 MAX:20")}
          >
            {t("__HOME_PARAGRAPH_CARD_STEP2 MAX:65")}
          </GenericCard>
          <GenericCard
            icon={<List />}
            title={t("__HOME_TITLE_CARD_STEP3 MAX:20")}
          >
            {t("__HOME_PARAGRAPH_CARD_STEP3 MAX:65")}
          </GenericCard>
          <GenericCard
            icon={<Wallet />}
            title={t("__HOME_TITLE_CARD_STEP4 MAX:20")}
          >
            {t("__HOME_PARAGRAPH_CARD_STEP4 MAX:65")}
          </GenericCard>
        </div>
        <div className="aq-text-center">
          <JoinInButton>{t("__HOME_CTA_STEP MAX:25")}</JoinInButton>
        </div>
        <Title size="s" className="text-marker disclaimer aq-text-center">
          {t("__HOME_SUBTITLE-CTA_STEP MAX:30")}
        </Title>
      </Container>
    </JoinTryberContainer>
  );
};
