import { Header } from "@appquality/appquality-design-system";
import userStore from "../redux/user";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useLogin";
import { LoginModal } from "./login-modal/LoginModal";
import menuStore from "../redux/menu";

const SiteHeader = () => {
  const menu = menuStore();
  const { user, isLoading } = userStore();
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
        isMenuOpen={menu.open}
        toggleMenu={menu.toggle}
        loginText={t("login")}
      />
      <LoginModal isOpen={login} onClose={() => setLogin(false)} />
    </>
  );
};

export default SiteHeader;
