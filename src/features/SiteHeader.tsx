import { Header } from "../stories/header/Header";
import { useUser } from "../store/useUser";

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
  return (
    <Header
      showLogin={showLogin}
      isLoading={isLoading}
      user={user}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
    />
  );
};

export default SiteHeader;
