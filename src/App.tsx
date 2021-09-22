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

function App() {
  const { t } = useTranslation();
  return (
    <Provider>
      <ThemeProvider theme={aqBootstrapTheme}>
        <GlobalStyle />
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
          <script src="https://form.jotform.com/cardforms/feedbackEmbedButton.min.js"></script>
        </Helmet>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
