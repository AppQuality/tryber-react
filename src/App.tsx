import { ThemeProvider } from "styled-components";
import { aqBootstrapTheme } from "./stories/theme/defaultTheme";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GettingStarted, MyBugs } from "./pages";
import SignIn from "./pages/SignIn";
import "./i18n";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";
import SiteHeader from "./features/SiteHeader";

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
        <SiteHeader showLogin={false} />
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
          <Route path={`${base}/it/getting-started-2`}>
            <Redirect to="/it/getting-started" />
          </Route>
          <Route path={`${base}/my-bugs`} component={MyBugs} />
          <Route path={`${base}/login`} component={SignIn} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
