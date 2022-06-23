import { Button, Text, Title } from "@appquality/appquality-design-system";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import unauthorizedBackground from "./assets/unauthorizedBackground.svg";
import unauthorizedIcon from "./assets/unauthorizedIcon.svg";

const StyledBugFormUnauthorized = styled.div`
  text-align: center;
  position: relative;
  margin: 4em 0;

  .unauthorized-empathy {
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
      width: 30%;
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    .unauthorized-empathy {
      top: 110px;
      width: 26em;
      img {
        width: auto;
      }
    }
  }
`;

export const BugFormUnauthorized = () => {
  const { t } = useTranslation();

  return (
    <StyledBugFormUnauthorized>
      <img src={unauthorizedBackground} alt="Unauthorized background" />
      <div className="unauthorized-empathy">
        <img
          className="aq-mb-3"
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
    </StyledBugFormUnauthorized>
  );
};
