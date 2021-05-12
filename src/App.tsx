import React from "react";
import {ThemeProvider} from "styled-components";
import {aqBootstrapTheme} from "./stories/theme/defaultTheme";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { GettingStarted} from "./pages";
import SignIn from "./pages/SignIn";
import {Header} from "./stories/header/Header";
import {Sidebar} from "./stories/sidebar/Sidebar";
import './i18n';
import TagManager from 'react-gtm-module';
import { HouseFill, PersonFill, Laptop } from "react-bootstrap-icons";

const tagManagerArgs = {
    gtmId: 'GTM-K55XC7S',
    dataLayerName: 'PageDataLayer'
}

TagManager.initialize(tagManagerArgs)
const base = '/:locale(en|it)?';

const sidebarArgs =  {
  open: true,
  languages: {
    current: {lang: 'it'},
    others: [{lang:'en', onClick: (lang:string) => {alert(lang)}},{lang:'es'}]
  },
  items: [
    {
      url: "#",
      icon: <HouseFill />,
      active: true,
      text: "Dashboard",
    },
    {
      url: "#",
      icon: <PersonFill />,
      active: false,
      text: "Profilo",
    },
    {
      url: "#",
      icon: <Laptop />,
      active: false,
      text: "Dispositivi",
    },
  ],
}
function App() {
  
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <BrowserRouter>
        <Header showLogin={false}/>
        <Sidebar {...sidebarArgs} >
        <Switch>
          <Route path={`${base}/getting-started`} component={GettingStarted} />
          <Route path={`${base}/it/getting-started-2`}>
            <Redirect to="/it/getting-started" />
          </Route>
          <Route path={`${base}/login`} component={SignIn} />
        </Switch>
        </Sidebar>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
