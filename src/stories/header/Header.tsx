import React from "react";
import { BoxArrowRight } from "react-bootstrap-icons";
import { Button } from "../button/Button";
import "./header.scss";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  image: string;
}

export interface HeaderProps {
  user?: User
  logo?: React.ReactNode,
  showLogin?: boolean
}

export interface UserInfoProps {
  user: User
}

export const Header = ({ user, logo, showLogin = true }: HeaderProps) => {
  let history = useHistory();
  const { i18n } = useTranslation();

  const UserInfo = ({ user }: UserInfoProps) => (
    <div className="user-info">
      <div className="user-avatar">
        <img alt={user.name + " " + user.surname} src={user.image} />
      </div>
      <div className="user-name">
        {user.name} {user.surname} <span className="user-id">(T{user.id})</span>
      </div>
      <Button size="sm" type="link">
        <BoxArrowRight />
      </Button>
    </div>
  );

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
      <div className="header-menu"></div>
      <div className="header-actions">
        {user ? (
          <UserInfo user={user} />
        ) : showLogin ? (
          <Button size="sm" type="link" onClick={handleLoginClick}>
            login
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
