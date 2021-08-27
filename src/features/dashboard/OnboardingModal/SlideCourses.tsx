import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Complete the Basic Course")}</Title>
        {t(
          "Take part in the Basic Course and earn 200 experience points, they will be essential to increase the chances to be selected for the campaigns. You'll become an AppQuality world expert and you will receive the Linkedin Certification to show that you are a qualified member of the Community."
        )}
      </div>
    </>
  );
};
