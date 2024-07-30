import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { BaseProps } from "@appquality/appquality-design-system/dist/shared/_types";

const StyledMenu = styled.nav`
  color: ${(props) => props.theme.palette.primary};
  min-height: 24px;
  text-align: right;
  .lang-navLink {
    color: ${(props) => props.theme.palette.info};
    &.current {
      font-weight: ${(props) =>
        props.theme.typography.fontWeight.bold.toString()};
      text-decoration: none;
      cursor: default;
      pointer-events: none;
    }
  }
  li {
    display: inline-block;
    margin: 0;
    padding: 0;
    &:not(:last-child) a {
      margin-right: 0.4em;
      padding-right: 0.4em;
      border-right: 1px solid ${(props) => props.theme.palette.primary};
    }
  }
`;

interface LangMenuProps extends BaseProps {
  itLink: string;
  enLink: string;
  esLink: string;
  frLink?: string;
}

export const LangMenu = ({
  itLink,
  enLink,
  esLink,
  frLink,
  className,
}: LangMenuProps) => {
  const { i18n, t } = useTranslation();
  return (
    <StyledMenu
      data-qa="language-switcher"
      className={className}
      aria-labelledby="language-menu-label"
    >
      <span id="language-menu-label" className="sr-only">
        {t("Language switcher menu")}
      </span>
      <ul>
        <li>
          <a
            data-qa="language-switcher-it"
            data-tracking="lang-switcher-it"
            href={itLink}
            className={`${
              i18n.language === "it" ? "current " : ""
            }lang-navLink`}
          >
            {i18n.language === "it" && (
              <span className="sr-only">{t("Current Page")}:</span>
            )}
            Italiano
          </a>
        </li>
        <li>
          <a
            data-qa="language-switcher-en"
            data-tracking="lang-switcher-en"
            href={enLink}
            className={`${
              i18n.language === "en" ? "current " : ""
            }lang-navLink`}
          >
            {i18n.language === "en" && (
              <span className="sr-only">{t("Current Page")}:</span>
            )}
            English
          </a>
        </li>
        <li>
          <a
            data-qa="language-switcher-es"
            data-tracking="lang-switcher-es"
            href={esLink}
            className={`${
              i18n.language === "es" ? "current " : ""
            }lang-navLink`}
          >
            {i18n.language === "es" && (
              <span className="sr-only">{t("Current Page")}:</span>
            )}
            Español
          </a>
        </li>
        <li>
          <a
            data-qa="language-switcher-fr"
            data-tracking="lang-switcher-fr"
            href={esLink}
            className={`${
              i18n.language === "fr" ? "current " : ""
            }lang-navLink`}
          >
            {i18n.language === "fr" && (
              <span className="sr-only">{t("Current Page")}:</span>
            )}
            Français
          </a>
        </li>
      </ul>
    </StyledMenu>
  );
};
