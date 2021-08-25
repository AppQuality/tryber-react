import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Complete the Basic Course")}</Title>
        {t(
          "Take part in the Basic Course now and earn 200 experience points, essential to increase your chances of being selected for the Test Campaigns. You will learn more about the world of AppQuality and you can receive a Linkedin certification to prove that you are a qualified AppQuality Tester."
        )}
      </div>
    </>
  );
};
