import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { Home } from "./pages";
import "./i18n";
import TagManager from "react-gtm-module";
import SiteHeader from "./features/SiteHeader";
import { Location } from "history";
import queryString from "query-string";

import userStore from "./redux/user";
import referralStore from "./redux/referral";
import { useEffect, useState } from "react";
import SiteWideMessages from "./features/SiteWideMessages";
import { datadogLogs } from "@datadog/browser-logs";
import { crowdRoutes, AppRoutes, appPages } from "./router";

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

function Page() {
  const [routes, setRoutes] = useState<appPages[]>([]);
  const { search } = useLocation();
  const { refresh } = userStore();
  const { setReferral } = referralStore();
  useEffect(() => {
    refresh && refresh();
    const values = queryString.parse(search);
    if (values.referral && typeof values.referral === "string") {
      setReferral(values.referral);
    }
  }, []);
  useEffect(() => {
    const appRoutes = Object.keys(crowdRoutes) as (keyof AppRoutes)[];
    setRoutes(appRoutes);
  }, [crowdRoutes]);

  const base = "/:locale(en|it|es)?";
  return (
    <>
      <SiteHeader />
      <SiteWideMessages />
      <Switch>
        {routes.map((route) => (
          <Route
            path={`${base}/${crowdRoutes[route].path}`}
            component={crowdRoutes[route].component}
            key={crowdRoutes[route].path}
          />
        ))}
        <Route path={`/it/getting-started-2`}>
          <Redirect to="/it/getting-started" />
        </Route>
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
        <Route
          path={`/it/punti-esperienza`}
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
          path={`/es/puntos-de-experiencia`}
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
          path={`/it/i-miei-bug`}
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
          path={`/es/errores-cargados`}
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
