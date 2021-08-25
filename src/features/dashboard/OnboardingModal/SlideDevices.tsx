import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Add your devices")}</Title>
        {t(
          "Enter the devices you have available to carry out the tests, they will be the tools with which you will face the activities and one of the selection criteria. Currently you can add PC / Notebook, Smartphone, Smartwatch, Tablet, Smart TV and Box / Stick TV."
        )}
      </div>
    </>
  );
};
