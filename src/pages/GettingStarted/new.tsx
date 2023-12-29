import {
  Button,
  Card,
  Container,
  DatepickerGlobalStyle,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import NotLoggedOnly from "src/features/NotLoggedOnly";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

export default function GettingStarted() {
  const { t } = useTranslation();
  const dashboard = useLocalizeRoute("my-dashboard");
  const emailSignup = useLocalizeRoute("getting-started/signup");
  const login = useLocalizeRoute("login");
  return (
    <NotLoggedOnly redirect={{ url: dashboard }}>
      <DatepickerGlobalStyle />
      <Container className="aq-pb-3">
        <LangMenu
          className="aq-mt-3"
          itLink="/it/getting-started/"
          esLink="/es/getting-started/"
          enLink="/getting-started/"
        />
        <Wrapper>
          <Title style={{ textAlign: "center" }} size="l" as={"h1"}>
            {t("Signup for Tryber")}
          </Title>
          <Card>
            <Button
              size="block"
              flat
              forwardedAs="a"
              href={`/wp-admin/admin-ajax.php?loc=${dashboard}&action=facebook_oauth_redirect&log=0`}
              data-qa="facebook-signup"
            >
              {t("Continue with Facebook")}
            </Button>
            <Button
              size="block"
              flat
              forwardedAs="a"
              href={`/wp-admin/admin-ajax.php?loc=${dashboard}&action=linkedin_oauth_redirect&log=0`}
              data-qa="linkedin-signup"
            >
              {t("Continue with LinkedIn")}
            </Button>
            <Button
              size="block"
              flat
              forwardedAs="a"
              href={emailSignup}
              data-qa="email-signup"
            >
              {t("Continue with email")}
            </Button>

            <Button
              forwardedAs="a"
              data-qa="terms-and-conditions"
              href={t("/terms-and-conditions/")}
              kind="link"
              target="_blank"
            >
              {t("Terms and Conditions")}
            </Button>
            <Button
              forwardedAs="a"
              data-qa="privacy-policy"
              href={t("https://www.iubenda.com/privacy-policy/7934311")}
              kind="link"
              target="_blank"
            >
              {t("Privacy Policy")}
            </Button>
            <Button
              forwardedAs="a"
              data-qa="ethical-code"
              href={t("/ethical-code/")}
              kind="link"
              target="_blank"
            >
              {t("Ethical Code")}
            </Button>
            <Button forwardedAs="a" data-qa="login" href={login} kind="link">
              {t("Log in")}
            </Button>
          </Card>
        </Wrapper>
      </Container>
    </NotLoggedOnly>
  );
}
