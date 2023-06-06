import TagManager from "react-gtm-module";
import useUser from "src/redux/user";
import { useHistory } from "react-router-dom";

import Loading from "./Loading";
import SiteHeader from "./SiteHeader";
import { useAppSelector } from "src/store";

const NotLoggedOnly = ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect?: { url: string; message?: string };
}) => {
  const { user, error, isLoading } = useUser();
  const history = useHistory();
  const isPublicUser = useAppSelector(
    (state) => state.publicUserPages.isPublic
  );

  if (isLoading) {
    return <Loading />;
  }
  if (user && redirect) {
    history.push(redirect.url);
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error && error.statusCode !== 403) {
    alert(error.message);
  }

  return (
    <>
      {!isPublicUser && <SiteHeader />}
      {children}
    </>
  );
};

export default NotLoggedOnly;
