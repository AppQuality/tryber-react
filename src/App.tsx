import "./i18n";

import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Page from "./Page";
import { Provider } from "react-redux";
import { store } from "src/store";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
  };

  TagManager.initialize(tagManagerArgs);
}

function App() {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
        <Helmet>
          <meta
            property="og:title"
            content={"Tryber - " + t("Earn money using your devices")}
          />
          <title>Tryber - {t("Earn money using your devices")}</title>
          <meta
            name="description"
            content={t(
              "Becoming a part of Crowd AppQuality community is simple: It's not requested a particular profile, is the multiprofile our power."
            )}
          />
          {_env_.REACT_APP_ENVIRONMENT !== "production" && (
            <meta name="robots" content="noindex" />
          )}
          {_env_.REACT_APP_ENVIRONMENT !== "production" && (
            <meta name="robots" content="nofollow" />
          )}
        </Helmet>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
