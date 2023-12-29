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
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/en" ||
    window.location.pathname === "/it" ||
    window.location.pathname === "/es";
  const history = useHistory();
  return (
    <>
      <Header
        onLogin={isHomePage ? () => setLogin(true) : undefined}
        isLoading={isLoading}
        logoUrl={homeUrl}
        user={user}
        isMenuOpen={isOpen}
        toggleMenu={toggle}
        loginText={t("login")}
      />
      {login && history.push(localizedUrl("/login"))}
    </>
  );
};

export default SiteHeader;
