import {
  aqBootstrapTheme,
  GlobalStyle,
  ThemeProvider,
} from "@appquality/appquality-design-system";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GettingStarted, MyBugs, ExperiencePoints, Home } from "./pages";
import "./i18n";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";
import SiteHeader from "./features/SiteHeader";
import { useState } from "react";
import { Location } from "history";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: "PageDataLayer",
  };

  TagManager.initialize(tagManagerArgs);
}
const base = "/:locale(en|it)?";

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <GlobalStyle />
      <Helmet>
        <meta
          property="og:title"
          content={"AppQuality Crowd - " + t("Earn money using your devices")}
        />
        <title>AppQuality Crowd - {t("Earn money using your devices")}</title>
        <meta
          name="description"
          content={t(
            "Becoming a part of Crowd AppQuality community is simple: It's not requested a particular profile, is the multiprofile our power."
          )}
        />
      </Helmet>
      <BrowserRouter>
        <SiteHeader
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
          <Route path={`${base}/it/getting-started-2`}>
            <Redirect to="/it/getting-started" />
          </Route>
          <Route
            path={`${base}/my-bugs`}
            component={() => <MyBugs isMenuOpen={isMenuOpen} />}
          />
          <Route
            path={`${base}/experience-points`}
            component={() => <ExperiencePoints isMenuOpen={isMenuOpen} />}
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
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
