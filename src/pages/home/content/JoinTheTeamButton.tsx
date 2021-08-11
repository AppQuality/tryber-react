import { useTranslation } from "react-i18next";
import { StyledCta } from "../_styles";
import { Button } from "@appquality/appquality-design-system";

export default () => {
  const { t, i18n } = useTranslation();
  return (
    <StyledCta>
      <Button
        as="a"
        className="capitalize-first"
        href={`${window.location.origin}/${
          i18n.language == "en" ? "" : `${i18n.language}/`
        }getting-started`}
        type="success"
        size="block"
      >
        {t("join the team")}
      </Button>
    </StyledCta>
  );
};
