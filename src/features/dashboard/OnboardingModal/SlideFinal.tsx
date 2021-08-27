import { Title, Button } from "@appquality/appquality-design-system";
import {Trans, useTranslation} from "react-i18next";
import API from "../../../utils/api";

export default ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="aq-py-3">
        <Title size="xs">{t("Have fun!")}</Title>
        <Trans
          i18nKey={`
            What you are starting is a path, made of test campaigns, courses, bugs, questionnaires, experience points... but above all you are becoming part of a Community formed by thousands of people from all over the world, who want to grow and contribute to improve the services and digital products we use in everyday life.
            <br />
            To support your growth, you'll find free and continuously updated training content in the University of Testing.
            If you don't know where to start, we recommend:
            <ul>
              <li>this short guide on how to start your adventure as a Tester: AQ - Instructions for use.</li>
              <li>the FAQ where all the most common doubts are collected!</li>
            </ul>
            For any doubt, question or advice do not hesitate to contact us at crowd@app-quality.com, the official email for tester support.
          `}
          components={{ br: <br />, ul: <ul />, li: <li /> }}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
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
      </div>
    </>
  );
};
