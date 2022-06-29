import { Button, Text, Title } from "@appquality/appquality-design-system";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import background from "./assets/background.svg";
import noDeviceIcon from "./assets/noDeviceIcon.svg";
import { StyledBugFormError } from "./style";

export const BugFormNoDevice = () => {
  const { t } = useTranslation();

  return (
    <StyledBugFormError>
      <img src={background} alt="background" />
      <div className="empathy-container">
        <img
          className="img-45 aq-mb-3"
          src={noDeviceIcon}
          alt="No device icon"
        />
        <Title size="ms">
          {t("BUGFORM_EMPATHY_SAVEDEVICE_TITLE", {
            defaultValue: "Add a device",
          })}
        </Title>
        <Text className="aq-text-primary aq-mt-3 aq-mb-3">
          {t("BUGFORM_EMPATHY_SAVEDEVICE_TXT", {
            defaultValue:
              "You don't have any devices saved: add at least one to be able to start reporting bugs.\n As soon as this is done, we will meet again here to continue the campaign!",
          })}
        </Text>
        <Button
          href={`${
            i18next.language === "en" ? "" : "/" + i18next.language
          }/personal-equipment/`}
          forwardedAs="a"
        >
          {t("BUGFORM_EMPATHY_SAVEDEVICE_CTA", {
            defaultValue: "Add a device",
          })}
        </Button>
      </div>
    </StyledBugFormError>
  );
};
