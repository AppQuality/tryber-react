import { Header } from "../stories/header/Header";
import { useUser } from "../store/useUser";

const SiteHeader = ({ showLogin }: { showLogin: boolean }) => {
  const { user, isLoading } = useUser();
  return <Header showLogin={showLogin} isLoading={isLoading} user={user} />;
};

export default SiteHeader;
