import React from "react";
import "./header.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserInfo } from "./UserInfo";
import { HeaderProps } from "./_types";

export const Header = ({
  logo,
  showLogin = true,
  isLoading,
  user,
}: HeaderProps) => {
  let history = useHistory();
  const { i18n } = useTranslation();
  console.log("user");
  console.log(user);
  const handleLoginClick = () => {
    history.push("/getting-started");
  };
  return (
    <div className="site-header">
      <div className="brand-logo">
        {logo ? (
          { logo }
        ) : (
          <a href={`${i18n.language === "it" ? "/it" : "/"}`}>
            <img
              alt="logo"
              src="https://crowd.app-quality.com/wp-content/themes/crowdappquality/img/aq_vector_logo_light_crowd.svg"
            />
          </a>
        )}
      </div>
      <div className="header-menu" />
      <UserInfo
        showLogin={showLogin}
        user={user}
        isLoading={isLoading}
        onLogin={handleLoginClick}
      />
    </div>
  );
};
