import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GettingStarted} from "./pages";
import SignIn from "./pages/SignIn";
import {Header} from "./stories/header/Header";
import React from "react";
import './i18n';

const base = '/:locale(en|it)?';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header showLogin={false}/>
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
          <Route path={`${base}/login`} component={SignIn} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
