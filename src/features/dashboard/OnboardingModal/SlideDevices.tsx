import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Add your devices")}</Title>
        {t(
          "Add the devices you will use for the Tests: they will be the tools to face the campaigns and one of the selection's criteria.\n" +
          "Currently you can add: PCs/Notebooks, Smartphones, Smartwatches, Tablets, Smart Tvs and Boxes/Sticks"
        )}
      </div>
    </>
  );
};
