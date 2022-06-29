import { Button, Text, Title } from "@appquality/appquality-design-system";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import background from "./assets/background.svg";
import unauthorizedIcon from "./assets/unauthorizedIcon.svg";
import { StyledBugFormError } from "./style";

export const BugFormUnauthorized = () => {
  const { t } = useTranslation();

  return (
    <StyledBugFormError>
      <img src={background} alt="background" />
      <div className="empathy-container">
        <img
          className="img-30 aq-mb-3"
          src={unauthorizedIcon}
          alt="Unauthorized icon"
        />
        <Title size="ms">
          {t("BUGFORM_EMPATHY_404_TITLE", {
            defaultValue: "There is nothing to see here",
          })}
        </Title>
        <Text className="aq-text-primary aq-mt-3 aq-mb-3">
          {t("BUGFORM_EMPATHY_404_TXT", {
            defaultValue:
              "We couldn't find the URL you typed: this is a page that doesn't exist.\n(Maybe that's why the Tryber is a little sad)",
          })}
        </Text>
        <Button
          href={`${
            i18next.language === "en" ? "" : "/" + i18next.language
          }/my-dashboard/`}
          forwardedAs="a"
        >
          {t("BUGFORM_EMPATHY_404_CTA", {
            defaultValue: "Back to the dashboard",
          })}
        </Button>
      </div>
    </StyledBugFormError>
  );
};
