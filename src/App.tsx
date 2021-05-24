import { ThemeProvider } from "styled-components";
import { aqBootstrapTheme } from "./stories/theme/defaultTheme";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GettingStarted } from "./pages";
import SignIn from "./pages/SignIn";
import { Header } from "./stories/header/Header";
import "./i18n";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";

const tagManagerArgs = {
  gtmId: "GTM-K55XC7S",
  dataLayerName: "PageDataLayer",
};

TagManager.initialize(tagManagerArgs);
const base = "/:locale(en|it)?";

function App() {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <Helmet>
        <link rel="icon" href="/static/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/static/logo192.png" />
        <link rel="manifest" href="/static/manifest.json" />
        <meta property="og:site_name" content="AppQuality Crowd" />
        <meta property="og:image" content="/static/crowdAppQuality.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
        <Header showLogin={false} />
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
          <Route path={`${base}/it/getting-started-2`}>
            <Redirect to="/it/getting-started" />
          </Route>
          <Route path={`${base}/login`} component={SignIn} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
