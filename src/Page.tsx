import { datadogLogs } from "@datadog/browser-logs";
import { createBrowserHistory, Location } from "history";
import queryString from "query-string";
import { useEffect } from "react";
import { Redirect, Route, Router, Switch, useLocation } from "react-router-dom";
import "./i18n";

import GenericModal from "./features/GenericModal";
import SiteWideMessages from "./features/SiteWideMessages";
import {
  Dashboard,
  Devices,
  ExperiencePoints,
  GettingStarted,
  GoodbyePage,
  Login,
  MyBugs,
  PreviewSelectionForm,
  Profile,
  Ranking,
  Signup,
  Wallet,
} from "./pages";
import BugForm from "./pages/BugForm";
import Manual from "./pages/Manual";
import Preview from "./pages/Preview";
import FileDropzonePage from "./pages/UsecaseMediaDropzone";
import SignupSuccess from "./pages/SignupSuccess";
import ThankYouPage from "./pages/ThankYou";
import VdpPage from "./pages/VDP";
import referralStore from "./redux/referral";

const history = createBrowserHistory();

if (process.env.REACT_APP_DATADOG_CLIENT_TOKEN) {
  datadogLogs.init({
    clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
    site: "datadoghq.eu",
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
}
const base = "/:locale(en|it|es|fr)?";

function Page() {
  const { search } = useLocation();
  const { setReferral } = referralStore();

  useEffect(() => {
    const values = queryString.parse(search);
    if (values.referral && typeof values.referral === "string") {
      setReferral(values.referral);
    }
  }, []);

  return (
    <div aria-live="polite">
      <SiteWideMessages />
      <GenericModal />
      <Router history={history}>
        <Switch>
          <Route path={`${base}/getting-started/signup`} component={Signup} />
          <Route
            path={`${base}/getting-started/confirmation`}
            component={SignupSuccess}
          />
          <Route path={`${base}/getting-started`} component={GettingStarted} />
          <Route path={`/it/getting-started-2`}>
            <Redirect to="/it/getting-started" />
          </Route>

          <Route path={`${base}/login`} component={Login} />

          <Route
            path={`*/login`}
            component={({ location }: { location: Location }) => (
              <Redirect
                to={{
                  ...location,
                  pathname: `/login`,
                }}
              />
            )}
          />

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
          <Route path={`${base}/vdp/:id/:token`} component={VdpPage} />
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
          <Route path={`${base}/campaigns/:id/preview`} component={Preview} />
          <Route path={`${base}/campaigns/:id/manual`} component={Manual} />
          <Route
            path={["/goodbye", "/it/goodbye", "/es/goodbye", "/fr/goodbye"]}
            exact
            component={GoodbyePage}
          />
          <Route path={"/"} exact>
            <Redirect to="/my-dashboard" />
          </Route>
          <Route path={"/it"} exact>
            <Redirect to="/it/my-dashboard" />
          </Route>
          <Route path={"/es"} exact>
            <Redirect to="/es/my-dashboard" />
          </Route>
          <Route path={"/fr"} exact>
            <Redirect to="/fr/my-dashboard" />
          </Route>
          <Route
            path={`${base}/campaign/:id/file-dropzone/:taskId`}
            component={FileDropzonePage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default Page;
