import { Header } from "@appquality/appquality-design-system";
import { useUser } from "../store/useUser";
import i18next from "i18next";

const SiteHeader = ({
  showLogin,
  isMenuOpen,
  toggleMenu,
}: {
  showLogin: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) => {
  const { user, isLoading } = useUser();
  const homeUrl = i18next.language == "en" ? "/" : `/${i18next.language}/`;
  return (
    <Header
      showLogin={showLogin}
      isLoading={isLoading}
      logoUrl={homeUrl}
      user={user}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
    />
  );
};

export default SiteHeader;
