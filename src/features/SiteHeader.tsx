import { Header } from "../stories/header/Header";
import { useUser } from "../store/useUser";

const SiteHeader = ({
  showLogin,
  toggleMenu,
}: {
  showLogin: boolean;
  toggleMenu: () => void;
}) => {
  const { user, isLoading } = useUser();
  return (
    <Header
      showLogin={showLogin}
      isLoading={isLoading}
      user={user}
      toggleMenu={toggleMenu}
    />
  );
};

export default SiteHeader;
