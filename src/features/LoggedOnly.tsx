import TagManager from "react-gtm-module";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import Loading from "./Loading";
import { LoginPage } from "./LoginPage";
import SiteHeader from "./SiteHeader";

const LoggedOnly = ({
  children,
  showHeader,
}: {
  children: React.ReactNode;
  showHeader: boolean;
}) => {
  const { error, isLoading } = useGetUsersMeQuery({});

  if (isLoading) {
    return <Loading />;
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error) {
    if ("status" in error && error.status === 403) {
      return <LoginPage />;
    } else {
      if ("message" in error) alert(error.message);
    }
    return null;
  }

  return (
    <>
      {showHeader ? <SiteHeader /> : null}
      {children}
    </>
  );
};
export default LoggedOnly;
