import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GettingStarted } from "./pages";
import {Header} from "./stories/header/Header";
import React from "react";

const base = '/:locale(en|it)?';

function App() {

  return (
    <>
      <Header showLogin={false}/>
      <BrowserRouter>
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
