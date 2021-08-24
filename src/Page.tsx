import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  GettingStarted,
  MyBugs,
  ExperiencePoints,
  Home,
  Dashboard,
} from "./pages";
import "./i18n";
import TagManager from "react-gtm-module";
import SiteHeader from "./features/SiteHeader";
import { Location } from "history";

import userStore from "./redux/user";
import { useEffect } from "react";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: "PageDataLayer",
  };

  TagManager.initialize(tagManagerArgs);
}
const base = "/:locale(en|it)?";

function Page() {
  const { refresh } = userStore();
  useEffect(() => {
    refresh && refresh();
  }, []);
  return (
    <BrowserRouter>
      <SiteHeader />
      <Switch>
        <Route path={`${base}/getting-started`} component={GettingStarted} />
        <Route path={`${base}/it/getting-started-2`}>
          <Redirect to="/it/getting-started" />
        </Route>

        <Route path={`${base}/my-dashboard`} component={() => <Dashboard />} />

        <Route path={`${base}/it/la-mia-dashboard`}>
          <Redirect to="/it/my-dashboard" />
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
        <Route path={["/", "/it"]} exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Page;
