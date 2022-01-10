import { Title } from "@appquality/appquality-design-system";
import { StyledSection } from "../_styles";
import { CardList } from "./CardList";
import { Trans, useTranslation } from "react-i18next";
import {
  Alarm,
  Eyeglasses,
  GraphUp,
  Headset,
  Laptop,
  Wallet2,
} from "react-bootstrap-icons";

export const CardSection = () => {
  const { t } = useTranslation();
  const cardListItems = [
    {
      icon: <Wallet2 />,
      title: t("fair payments"),
      body: (
        <Trans
          i18nKey="By successfully completing a Campaign <bold>you will receive a payout</bold>, which you can transfer to your IBAN or PayPal."
          defaults="By successfully completing a Campaign <bold>you will receive a payout</bold>, which you can transfer to your IBAN or PayPal."
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
    {
      icon: <Laptop />,
      title: t("devices"),
      body: (
        <Trans
          i18nKey="To test you won't need special equipment, but simply  <bold>your own personal devices</bold>"
          defaults="To test you won't need special equipment, but simply  <bold>your own personal devices</bold>"
          components={{ bold: <strong /> }}
        />
      ),
    },
    {
      icon: <Eyeglasses />,
      title: t("free training"),
      body: (
        <Trans
          i18nKey="Don't know anything about testing?<br></br> Don't be afraid! We have for you <bold>Certificated Basic Courses</bold> and many training articles"
          defaults="Don't know anything about testing?<br></br> Don't be afraid! We have for you <bold>Certificated Basic Courses</bold> and many training articles"
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
    {
      icon: <Alarm />,
      title: t("flexible hours"),
      body: (
        <Trans
          i18nKey="<bold>Test when and where you want!</bold><br></br>The important thing is to respect the closing date of the Test Campaign"
          defaults="<bold>Test when and where you want!</bold><br></br>The important thing is to respect the closing date of the Test Campaign"
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
    {
      icon: <GraphUp />,
      title: t("grow your experience"),
      body: t(
        "Each Test you take will allow you to increase your skills and hone your tester abilities."
      ),
    },
    {
      icon: <Headset />,
      title: t("constant support"),
      body: (
        <Trans
          i18nKey="<bold>A Team of competent and professional figures</bold> will always be at your side to resolve any doubts <br></br>you may have"
          defaults="<bold>A Team of competent and professional figures</bold> will always be at your side to resolve any doubts <br></br>you may have"
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
  ];

  return (
    <StyledSection style={{ padding: "0 40px" }}>
      <Title
        size="xl"
        className="text-marker aq-text-center aq-mb-4 section-title-wrapper"
      >
        {t("Why should you become an AppQuality Tester?")}
      </Title>
      <div className="section-content-wrapper">
        <CardList items={cardListItems} />
      </div>
    </StyledSection>
  );
};
