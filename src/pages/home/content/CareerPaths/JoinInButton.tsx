import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      type="secondary"
      flat
      className="aq-mb-4"
      forwardedAs="a"
      href={`${window.location.origin}/${
        i18n.language == "en" ? "" : `${i18n.language}/`
      }getting-started/`}
    >
      {t("JOIN IN TRYBER")}
    </Button>
  );
};
