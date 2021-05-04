import React, { useEffect } from "react";
import { Container, BSGrid, BSCol, CSSGrid } from "../stories/layout/Layout";
import { Card } from "../stories/card/Card";
import { Button } from "../stories/button/Button";
import { H5, Paragraph } from "../stories/typography/Typography";
import { SignupForm } from "../features/SignupForm";
import { useTranslation } from "react-i18next";
import signupImage from "./assets/group-236.png";
import API from "../utils/api";

export interface PageInterface {
  location: string;
}

export default function GettingStarted() {
  const { t, i18n } = useTranslation();
  const redirectUrl =
    i18n.language === "en" ? "/my-dashboard/" : "/it/la-mia-dashboard/";

  useEffect(() => {
    API.me()
      .then((res) => {
        // user logged in
        window.location.href = redirectUrl;
      })
      .catch((e) => {
        if (e.statusCode === 403) {
          // user logged out, proceed
        } else {
          alert(e.message);
        }
      });
  }, [redirectUrl]);

  const signupWithFb = () => {
    window.location.href =
      "/wp-admin/admin-ajax.php?loc=getting-started&action=facebook_oauth_redirect&log=0";
  };
  const signupWithLn = () => {
    window.location.href =
      "/wp-admin/admin-ajax.php?loc=getting-started&action=linkedin_oauth_redirect&log=0";
  };
  return (
    <Container>
      <h2>{t("become-a-tester")}</h2>
      <BSGrid>
        <BSCol size="lg-8">
          <div style={{ marginBottom: "30px" }}>
            <Card>
              <CSSGrid gutter="50px" min="200px" maxWidth="500px">
                <SignupForm redirectUrl={redirectUrl} />
                <div className="signup-with-email">
                  <H5>{t("signup-with-social")}</H5>
                  <Paragraph>{t("signup-with-social-description")}</Paragraph>
                  <Button
                    type="primary"
                    size="block"
                    flat
                    onClick={signupWithFb}
                  >
                    {t("facebook")}
                  </Button>
                  <Button
                    type="secondary"
                    size="block"
                    flat
                    onClick={signupWithLn}
                  >
                    {t("linkedin")}
                  </Button>
                  <img alt={t('become-a-tester')} src={signupImage} />
                </div>
              </CSSGrid>
            </Card>
          </div>
        </BSCol>
      </BSGrid>
    </Container>
  );
}
