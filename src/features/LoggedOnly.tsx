import TagManager from "react-gtm-module";
import { shallowEqual, useSelector } from "react-redux";
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
  const {
    error,
    loading,
  }: {
    error?: any;
    loading?: boolean;
  } = useSelector(
    (state: GeneralState) => ({
      loading: state.user.loading,
      error: state.user.error,
    }),
    shallowEqual
  );

  if (loading || typeof loading === "undefined") {
    return <Loading />;
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error) {
    if (error.statusCode === 403) {
      return <LoginPage />;
    } else {
      alert(error.message);
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
