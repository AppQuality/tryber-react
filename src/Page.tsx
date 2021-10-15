import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import {
  Dashboard,
  Devices,
  ExperiencePoints,
  GettingStarted,
  Home,
  MyBugs,
} from "./pages";
import "./i18n";
import TagManager from "react-gtm-module";
import SiteHeader from "./features/SiteHeader";
import { Location } from "history";
import queryString from "query-string";

import UserStore from "./redux/user";
import ReferralStore from "./redux/referral";
import { useEffect } from "react";
import SiteWideMessages from "./features/SiteWideMessages";
import { datadogLogs } from "@datadog/browser-logs";

if (process.env.REACT_APP_DATADOG_CLIENT_TOKEN) {
  datadogLogs.init({
    clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
    site: "datadoghq.eu",
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
}
if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: "PageDataLayer",
  };

  TagManager.initialize(tagManagerArgs);
}
const base = "/:locale(en|it|es)?";

function Page() {
  const { search } = useLocation();
  const { refresh } = UserStore();
  const { setReferral } = ReferralStore();
  useEffect(() => {
    refresh && refresh();
    const values = queryString.parse(search);
    if (values.referral && typeof values.referral === "string") {
      setReferral(values.referral);
    }
  }, []);
  return (
    <>
      <SiteHeader />
      <SiteWideMessages />
      <Switch>
        <Route path={`${base}/getting-started`} component={GettingStarted} />
        <Route path={`/it/getting-started-2`}>
          <Redirect to="/it/getting-started" />
        </Route>

        <Route path={`${base}/my-dashboard`} component={() => <Dashboard />} />

        <Route
          path={`${base}/personal-equipment`}
          component={() => <Devices />}
        />
        <Route
          path={`/it/i-miei-device`}
          component={({ location }: { location: Location }) => (
            <Redirect
              to={{
                ...location,
                pathname: "/it/personal-equipment",
              }}
            />
          )}
        />
        <Route
          path={`/es/dispositivos`}
          component={({ location }: { location: Location }) => (
            <Redirect
              to={{
                ...location,
                pathname: "/es/personal-equipment",
              }}
            />
          )}
        />

        <Route path={`/it/la-mia-dashboard`}>
          <Redirect to="/it/my-dashboard" />
        </Route>
        <Route path={`/es/tablero`}>
          <Redirect to="/es/my-dashboard" />
        </Route>

        <Route path={`${base}/my-bugs`} component={() => <MyBugs />} />
        <Route
          path={`${base}/experience-points`}
          component={() => <ExperiencePoints />}
        />
        <Route
          path={`${base}/it/punti-esperienza`}
          component={({ location }: { location: Location }) => (
            <Redirect
              to={{
                ...location,
                pathname: "/it/experience-points",
              }}
            />
          )}
        />
        <Route
          path={`${base}/es/puntos-de-experiencia`}
          component={({ location }: { location: Location }) => (
            <Redirect
              to={{
                ...location,
                pathname: "/es/experience-points",
              }}
            />
          )}
        />
        <Route
          path={`${base}/it/i-miei-bug`}
          component={({ location }: { location: Location }) => (
            <Redirect
              to={{
                ...location,
                pathname: "/it/my-bugs",
              }}
            />
          )}
        />
        <Route
          path={`${base}/es/errores-cargados`}
          component={({ location }: { location: Location }) => (
            <Redirect
              to={{
                ...location,
                pathname: "/es/my-bugs",
              }}
            />
          )}
        />
        <Route path={["/", "/it", "/es"]} exact component={Home} />
      </Switch>
    </>
  );
}

export default Page;
