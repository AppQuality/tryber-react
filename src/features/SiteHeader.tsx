import { Header } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import menuStore from "../redux/menu";
import userStore from "../redux/user";
import localizedUrl from "src/utils/localizedUrl";
import { useHistory } from "react-router-dom";

const SiteHeader = () => {
  const menu = menuStore();
  const { isOpen, toggle } = menu;
  const { user, isLoading } = userStore();
  const [login, setLogin] = useState(false);
  const { i18n, t } = useTranslation();

  const homeUrl = i18n.language === "en" ? "/" : `/${i18n.language}/`;
  const isLoginPage = window.location.pathname.includes("/login");
  const history = useHistory();
  return (
    <>
      <Header
        onLogin={() => setLogin(true)}
        isLoading={isLoading}
        logoUrl={homeUrl}
        user={user}
        isMenuOpen={isOpen}
        toggleMenu={toggle}
        loginText={isLoginPage ? "" : t("login")}
      />
      {login && history.push(localizedUrl("/login"))}
    </>
  );
};

export default SiteHeader;
