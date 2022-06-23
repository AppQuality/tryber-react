import { Button, Text, Title } from "@appquality/appquality-design-system";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import noDeviceBackground from "./assets/noDeviceBackground.svg";
import noDeviceIcon from "./assets/noDeviceIcon.svg";

const StyledBugFormNoDevice = styled.div`
  text-align: center;
  position: relative;
  margin: 4em 0;

  .no-device-empathy {
    position: absolute;
    top: 15px;
    left: 0;
    right: 10px;
    margin: auto;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 45%;
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    .no-device-empathy {
      top: 110px;
      width: 26em;
      img {
        width: auto;
      }
    }
  }
`;

export const BugFormNoDevice = () => {
  const { t } = useTranslation();

  return (
    <StyledBugFormNoDevice>
      <img src={noDeviceBackground} alt="No device background" />
      <div className="no-device-empathy">
        <img className="aq-mb-3" src={noDeviceIcon} alt="No device icon" />
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
    </StyledBugFormNoDevice>
  );
};
