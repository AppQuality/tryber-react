import { Route, Switch, Redirect, useLocation } from "react-router-dom";
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
import queryString from "query-string";

import userStore from "./redux/user";
import referralStore from "./redux/referral";
import { useEffect } from "react";
import SiteWideMessages from "./features/SiteWideMessages";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: "PageDataLayer",
  };

  TagManager.initialize(tagManagerArgs);
}
const base = "/:locale(en|it)?";

function Page() {
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

  return (
    <>
      <SiteHeader />
      <SiteWideMessages />
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
    </>
  );
}

export default Page;
