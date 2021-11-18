import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const { t } = useTranslation();

  if (loading || typeof loading === "undefined") {
    return (
      <div id="appq-loading-content">
        <div id="appq-loading-spinner">
          <div></div>
        </div>
      </div>
    );
  }
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
