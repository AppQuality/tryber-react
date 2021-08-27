import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Fill in your profile details")}</Title>
        {t(
          "As first step to be done, complete your profile with authentic and real data. This is the only way to be selected for the Campaigns and get your reward."
        )}
      </div>
    </>
  );
};
