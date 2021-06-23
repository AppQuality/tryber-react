import { Header } from "@appquality/appquality-design-system";
import { useUser } from "../store/useUser";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useLogin";
import { LoginModal } from "./login-modal/LoginModal";

const SiteHeader = ({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) => {
  const { user, isLoading } = useUser();
  const { login, setLogin } = useLogin();
  const { i18n } = useTranslation();

  const homeUrl = i18n.language === "en" ? "/" : `/${i18n.language}/`;
  return (
    <>
      <Header
        onLogin={() => setLogin(true)}
        isLoading={isLoading}
        logoUrl={homeUrl}
        user={user}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
      <LoginModal isOpen={login} onClose={() => setLogin(false)} />
    </>
  );
};

export default SiteHeader;
