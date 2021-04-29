import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GettingStarted } from "./pages";
import LoginForm from "./components/LoginForm";
import ProjectList from "./components/ProjectList";
import {Header} from "./stories/header/Header";
import React from "react";
import useToken from "./store/useToken";

const base = '/:locale(en|it)?';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
