import TagManager from "react-gtm-module";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingSvg from "src/pages/assets/loading.svg";

import { useLocalizeRoute } from "../hooks/useLocalizedRoute";

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
    return (
      <div id="appq-loading-content">
        <div style={{ width: "60px", height: "60px" }}>
          <object type="image/svg+xml" data={LoadingSvg}>
            svg-animation
          </object>
        </div>
      </div>
    );
  }
  TagManager.dataLayer({
    dataLayer: {
      event: "ApiLoaded",
    },
  });
  if (error) {
    if (error.statusCode === 403) {
      history.push(homeRoute);
    } else {
      alert(error.message);
    }
    return null;
  }

  return <>{children}</>;
};
