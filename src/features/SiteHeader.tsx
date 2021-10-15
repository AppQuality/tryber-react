import { Header } from "@appquality/appquality-design-system";
import UserStore from "../redux/user";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useLogin";
import { LoginModal } from "./login-modal/LoginModal";
import MenuStore from "../redux/menu";

const SiteHeader = () => {
  const menu = MenuStore();
  const { isOpen, toggle } = menu;
  const { user, isLoading } = UserStore();
  const { login, setLogin } = useLogin();
  const { i18n, t } = useTranslation();

  const homeUrl = i18n.language === "en" ? "/" : `/${i18n.language}/`;
  return (
    <>
      <Header
        onLogin={() => setLogin(true)}
        isLoading={isLoading}
        logoUrl={homeUrl}
        user={user}
        isMenuOpen={isOpen}
        toggleMenu={toggle}
        loginText={t("login")}
      />
      <LoginModal isOpen={login} onClose={() => setLogin(false)} />
    </>
  );
};

export default SiteHeader;
