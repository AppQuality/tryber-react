import TagManager from "react-gtm-module";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useLocalizeRoute } from "../hooks/useLocalizedRoute";
import Loading from "./Loading";

export default ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const homeRoute = useLocalizeRoute("");
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
    if (error.statusCode !== 403) {
      alert(error.message);
    }
    return null;
  }

  return <>{children}</>;
};
