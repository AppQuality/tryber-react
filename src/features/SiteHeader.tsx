import { Header } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import localizedUrl from "src/utils/localizedUrl";
import menuStore from "../redux/menu";
import userStore from "../redux/user";

const SiteHeader = ({ route }: { route: string }) => {
  const menu = menuStore();
  const { isOpen, toggle } = menu;
  const { user, isLoading } = userStore();
  const { i18n, t } = useTranslation();

  const homeUrl = i18n.language === "en" ? "/" : `/${i18n.language}/`;
  const history = useHistory();
  return (
    <>
      <Header
        onLogin={
          route === "home"
            ? () => history.push(localizedUrl("/login"))
            : undefined
        }
        isLoading={isLoading}
        logoUrl={homeUrl}
        user={user}
        isMenuOpen={isOpen}
        toggleMenu={toggle}
        loginText={t("login")}
      />
    </>
  );
};

export default SiteHeader;
