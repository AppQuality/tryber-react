import "./i18n";
import { datadogLogs } from "@datadog/browser-logs";
import { Location } from "history";
import queryString from "query-string";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import GenericModal from "./features/GenericModal";
import SiteWideMessages from "./features/SiteWideMessages";
import {
  Dashboard,
  Devices,
  ExperiencePoints,
  GettingStarted,
  GoodbyePage,
  Home,
  MyBugs,
  Profile,
  Ranking,
  Wallet,
  PreviewSelectionForm,
} from "./pages";
import referralStore from "./redux/referral";
import { refreshUser } from "./redux/user/actions/refreshUser";
import BugForm from "./pages/BugForm";
import ThankYouPage from "./pages/ThankYou";

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
  };

  TagManager.initialize(tagManagerArgs);
}
const base = "/:locale(en|it|es)?";

function Page() {
  const { search } = useLocation();
  const { setReferral } = referralStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    const values = queryString.parse(search);
    if (values.referral && typeof values.referral === "string") {
      setReferral(values.referral);
    }
  }, []);

  return (
    <div>
      <SiteWideMessages />
      <GenericModal />
      <Switch>
        <Route path={`${base}/getting-started`} component={GettingStarted} />
        <Route path={`/it/getting-started-2`}>
          <Redirect to="/it/getting-started" />
        </Route>

        <Route path={`${base}/my-dashboard`} component={Dashboard} />

        <Route path={`${base}/personal-equipment`} component={Devices} />
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

        <Route path={`${base}/my-bugs`} component={MyBugs} />
        <Route
          path={`${base}/experience-points`}
          component={ExperiencePoints}
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

        <Route path={`${base}/my-account`} component={Profile} />
        <Route path={`${base}/payments`} component={Wallet} />
        <Route path={`${base}/leaderboard`} component={Ranking} />
        <Route path={`${base}/campaign/:id/bugform`} component={BugForm} />
        <Route path={`${base}/thank-you`} component={ThankYouPage} />
        {/* TODO Temporary route */}
        <Route
          path={`${base}/campaign/:id/preview-selection-form`}
          component={PreviewSelectionForm}
        />
        <Route
          path={["/goodbye", "/it/goodbye", "/es/goodbye"]}
          exact
          component={GoodbyePage}
        />
        <Route path={["/", "/it", "/es"]} exact component={() => <Home />} />
      </Switch>
    </div>
  );
}

export default Page;
