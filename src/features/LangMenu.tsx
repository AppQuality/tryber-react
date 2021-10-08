import styled from "styled-components";
import React from "react";
import { useTranslation } from "react-i18next";

import { BaseProps } from "@appquality/appquality-design-system/dist/shared/_types";

const StyledMenu = styled.div`
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
`;

interface LangMenuProps extends BaseProps {
  itLink: string;
  enLink: string;
  esLink: string;
}

export const LangMenu = ({
  itLink,
  enLink,
  esLink,
  className,
}: LangMenuProps) => {
  const { i18n, t } = useTranslation();
  return (
    <StyledMenu className={className}>
      <a
        href={itLink}
        className={`${i18n.language === "it" ? "current " : ""}lang-navLink`}
      >
        {t("Italian")}
      </a>{" "}
      |{" "}
      <a
        href={enLink}
        className={`${i18n.language === "en" ? "current " : ""}lang-navLink`}
      >
        {t("English")}
      </a>{" "}
      |{" "}
      <a
        href={esLink}
        className={`${i18n.language === "es" ? "current " : ""}lang-navLink`}
      >
        {t("Spanish")}
      </a>
    </StyledMenu>
  );
};
