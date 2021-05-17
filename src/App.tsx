import React from "react";
import { ThemeProvider } from "styled-components";
import { aqBootstrapTheme } from "./stories/theme/defaultTheme";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GettingStarted } from "./pages";
import SignIn from "./pages/SignIn";
import { Header } from "./stories/header/Header";
import "./i18n";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-K55XC7S",
  dataLayerName: "PageDataLayer",
};

TagManager.initialize(tagManagerArgs);
const base = "/:locale(en|it)?";

function App() {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
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
