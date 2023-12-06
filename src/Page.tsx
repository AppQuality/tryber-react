import "./i18n";
import { datadogLogs } from "@datadog/browser-logs";
import { Location, createBrowserHistory } from "history";
import queryString from "query-string";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { useDispatch } from "react-redux";
import { Redirect, Route, Router, Switch, useLocation } from "react-router-dom";

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
import VdpPage from "./pages/VDP";
import * as Sentry from "@sentry/react";
import SentryWrapper from "./features/SentryWrapper";

// Create Custom Sentry Route component
const SentryRoute = Sentry.withSentryRouting(Route);
const history = createBrowserHistory();

if (process.env.REACT_APP_DATADOG_CLIENT_TOKEN) {
  datadogLogs.init({
    clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
    site: "datadoghq.eu",
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
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
    <SentryWrapper history={history}>
      <SiteWideMessages />
      <GenericModal />
      <Router history={history}>
        <Switch>
          <SentryRoute
            path={`${base}/getting-started`}
            component={GettingStarted}
          />
          <SentryRoute path={`/it/getting-started-2`}>
            <Redirect to="/it/getting-started" />
          </SentryRoute>

          <SentryRoute path={`${base}/my-dashboard`} component={Dashboard} />

          <SentryRoute
            path={`${base}/personal-equipment`}
            component={Devices}
          />
          <SentryRoute
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
          <SentryRoute
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

          <SentryRoute path={`/it/la-mia-dashboard`}>
            <Redirect to="/it/my-dashboard" />
          </SentryRoute>
          <SentryRoute path={`/es/tablero`}>
            <Redirect to="/es/my-dashboard" />
          </SentryRoute>

          <SentryRoute path={`${base}/my-bugs`} component={MyBugs} />
          <SentryRoute path={`${base}/vdp/:id/:token`} component={VdpPage} />
          <SentryRoute
            path={`${base}/experience-points`}
            component={ExperiencePoints}
          />
          <SentryRoute
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
          <SentryRoute
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
          <SentryRoute
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
          <SentryRoute
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

          <SentryRoute path={`${base}/my-account`} component={Profile} />
          <SentryRoute path={`${base}/payments`} component={Wallet} />
          <SentryRoute path={`${base}/leaderboard`} component={Ranking} />
          <SentryRoute
            path={`${base}/campaign/:id/bugform`}
            component={BugForm}
          />
          <SentryRoute path={`${base}/thank-you`} component={ThankYouPage} />
          {/* TODO Temporary route */}
          <SentryRoute
            path={`${base}/campaign/:id/preview-selection-form`}
            component={PreviewSelectionForm}
          />
          <SentryRoute
            path={["/goodbye", "/it/goodbye", "/es/goodbye"]}
            exact
            component={GoodbyePage}
          />
          <SentryRoute
            path={["/", "/it", "/es"]}
            exact
            component={() => <Home />}
          />
        </Switch>
      </Router>
    </SentryWrapper>
  );
}

export default Page;
