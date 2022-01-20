import { Title, Button, Text } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import API from "../../../utils/api";
import { OnBoardingSlide } from "./OnBoardingSlide";

export default ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      <OnBoardingSlide className="aq-pt-3 aq-mb-3">
        <Title className="aq-mb-2" size="xs" as="h3">
          {t("Have fun!")}
        </Title>
        <Text className="aq-mb-3 main-text" style={{ "--max-height": "10em" }}>
          <Trans
            i18nKey={
              "What you are starting is a path, made of test campaigns, courses, bugs, questionnaires, experience points... but above all you are becoming part of a Community formed by thousands of people from all over the world, who want to grow and contribute to improve the services and digital products we use in everyday life.\n            <br />\n            To support your growth, you'll find free and continuously updated training content in the University of Testing.\n            If you don't know where to start, we recommend:\n            <ul>\n              <li>this short guide on how to start your adventure as a Tester: <a target='_blank' href='/aq-instructions-for-use/'>AQ - Instructions for use.</a></li>\n              <li>the <a target='_blank' href='/faq/'>FAQ</a> where all the most common doubts are collected!</li>\n            </ul>\n            For any doubt, question or advice do not hesitate to contact us at <a href='mailto:crowd@app-quality.com'>crowd@app-quality.com</a>, the official email for tester support."
            }
            components={{ br: <br />, ul: <ul />, li: <li />, a: <a /> }}
          >
            What you are starting is a path, made of test campaigns, courses,
            bugs, questionnaires, experience points... but above all you are
            becoming part of a Community formed by thousands of people from all
            over the world, who want to grow and contribute to improve the
            services and digital products we use in everyday life.
            <br />
            To support your growth, you'll find free and continuously updated
            training content in the University of Testing. If you don't know
            where to start, we recommend:
            <ul>
              <li>
                this short guide on how to start your adventure as a Tester:{" "}
                <a target="_blank" href="/aq-instructions-for-use/">
                  AQ - Instructions for use.
                </a>
              </li>
              <li>
                the{" "}
                <a target="_blank" href="/faq/">
                  FAQ
                </a>{" "}
                where all the most common doubts are collected!
              </li>
            </ul>
            For any doubt, question or advice do not hesitate to contact us at{" "}
            <a href="mailto:crowd@app-quality.com">crowd@app-quality.com</a>,
            the official email for tester support.
          </Trans>
        </Text>
        <div className="onboardingCTA">
          <Button
            flat
            type="success"
            onClick={() => {
              API.setOnboardingComplete();
              onClose();
            }}
          >
            {t("Take me to the dashboard")}
          </Button>
        </div>
      </OnBoardingSlide>
    </>
  );
};
