import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Complete your profile")}</Title>
        {t(
          "As a first step to take, complete your profile in its entirety by entering authentic and truthful data. Only in this way can you be selected for Test Campaigns and request payment correctly."
        )}
      </div>
    </>
  );
};
