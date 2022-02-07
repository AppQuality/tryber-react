import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

import { StyledCta } from "../_styles";

export default () => {
  const { t, i18n } = useTranslation();
  return (
    <StyledCta>
      <Button
        type="secondary"
        className="aq-mb-4"
        forwardedAs="a"
        href={`${window.location.origin}/${
          i18n.language == "en" ? "" : `${i18n.language}/`
        }getting-started/`}
      >
        {t("join in tryber").toUpperCase()}
      </Button>

      <Button
        forwardedAs="a"
        flat
        className="aq-mb-4 aq-m-2"
        href={`${window.location.origin}/${
          i18n.language == "en" ? "" : `${i18n.language}/`
        }getting-started/`}
        type="secondary"
      >
        {t("learn more").toUpperCase()}
      </Button>
    </StyledCta>
  );
};
