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

import { Provider } from "react-redux";
import { setupStore } from "src/store";
import Page from "./Page";

import isStagingEnvironment from "./features/isStagingEnvironment";

if (process.env.REACT_APP_GTM_ID) {
  TagManager.initialize({
    gtmId: process.env.REACT_APP_GTM_ID,
    ...(isStagingEnvironment()
      ? {
          auth: "ectL1CLYWcmhRB38LCkZ7w",
          preview: "env-110",
        }
      : {}),
  });
}

function App() {
  const { t } = useTranslation();
  return (
    <Provider store={setupStore()}>
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
          {isStagingEnvironment() && <meta name="robots" content="noindex" />}
          {isStagingEnvironment() && <meta name="robots" content="nofollow" />}
        </Helmet>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
