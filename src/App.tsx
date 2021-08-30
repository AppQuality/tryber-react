import {
  aqBootstrapTheme,
  GlobalStyle,
} from "@appquality/appquality-design-system";
import "./i18n";
import { useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import Helmet from "react-helmet";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Provider from "./redux/provider";
import Page from "./Page";

if (process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: "PageDataLayer",
  };

  TagManager.initialize(tagManagerArgs);
}

const TemporaryGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  .container .hero {
    margin-left: calc(-24px/2);
    margin-right: calc(-24px/2);
    @media (min-width: 768px) {
      margin-left: calc((720px - 100vw - 24px)/2);
      margin-right: calc((720px - 100vw - 24px)/2);
    }
    @media (min-width: 1200px) {
      margin-left: calc((1140px - 100vw - 24px)/2);
      margin-right: calc((1140px - 100vw - 24px)/2);
    }
    @media (min-width: 1400px) {
      margin-left: calc((1320px - 100vw - 24px)/2);
      margin-right: calc((1320px - 100vw - 24px)/2);
    }
  }
`;

function App() {
  const { t } = useTranslation();
  return (
    <Provider>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
        <TemporaryGlobalStyle />
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
          <Page />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
