import "./header.scss";
import { useTranslation } from "react-i18next";
import { UserInfo } from "./UserInfo";
import { HeaderProps } from "./_types";
import useWindowSize from "../../store/useWindowSize";

export const Header = ({
  logo,
  showLogin = true,
  isLoading,
  toggleMenu,
  user,
}: HeaderProps) => {
  const { i18n } = useTranslation();
  useWindowSize();
  const handleLoginClick = () => {
    window.location.href = "/";
  };
  const handleLogoutClick = () => {
    fetch("/wp-admin/admin-ajax.php?action=appq_wp_logout", {
      method: "GET",
    })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const showMobile = window.matchMedia("only screen and (max-width: 768px)")
    .matches;

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
      {showMobile ? (
        <a onClick={toggleMenu}>|||</a>
      ) : (
        <UserInfo
          showLogin={showLogin}
          user={user}
          isLoading={isLoading}
          onLogin={handleLoginClick}
          onLogout={handleLogoutClick}
        />
      )}
    </div>
  );
};
