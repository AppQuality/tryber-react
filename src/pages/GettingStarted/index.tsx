import {
  Container,
  DatepickerGlobalStyle,
  Text,
  Title,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { EnvelopeFill } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { ButtonWithIcon } from "src/features/ButtonWithIcon";
import { CenteredCard } from "src/features/CenteredCard";
import { LangMenu } from "src/features/LangMenu";
import { PageTemplate } from "src/features/PageTemplate";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";

export default function GettingStarted() {
  const { t } = useTranslation();
  let history = useHistory();
  const emailSignup = useLocalizeRoute("getting-started/signup");
  const login = useLocalizeRoute("login");
  const signupSuccess = useLocalizeRoute("getting-started/confirmation");
  const onEmailSignupClick = () => {
    history.push(emailSignup);
  };
  return (
    <PageTemplate
      shouldBeLoggedIn={false}
      route={"getting-started/signup"}
      pageTitle={t("Signup for Tryber")}
    >
      <DatepickerGlobalStyle />
      <Container>
        <LangMenu
          className="aq-pt-3"
          itLink="/it/getting-started/"
          esLink="/es/getting-started/"
          enLink="/getting-started/"
        />
        <Title className="aq-text-center aq-mb-3 aq-pt-3" size="l" as={"h1"}>
          {t("Signup for Tryber")}
        </Title>
        <CenteredCard>
          <div className="card-body aq-text-center aq-mb-3">
            <img
              aria-hidden
              src="/static/trybers-login.svg"
              alt="tryber-login"
              className="aq-mb-4"
            />
            <ButtonWithIcon
              forwardedAs="a"
              href={`/wp-admin/admin-ajax.php?loc=${signupSuccess}&action=facebook_oauth_redirect&log=0`}
              data-qa="facebook-signup"
              className="aq-mb-3"
              size="block"
              flat
            >
              <img
                aria-hidden
                alt="login with linkedin"
                src="/static/FB.svg"
                className="button-left-img"
              />
              <span className="button-text">{t("Continue with Facebook")}</span>
            </ButtonWithIcon>
            <ButtonWithIcon
              forwardedAs="a"
              href={`/wp-admin/admin-ajax.php?loc=${signupSuccess}&action=linkedin_oauth_redirect&log=0`}
              data-qa="linkedin-signup"
              className="aq-mb-3"
              size="block"
              flat
            >
              <img
                aria-hidden
                alt="login with linkedin"
                src="/static/LN.svg"
                className="button-left-img"
              />
              <span className="button-text">{t("Continue with LinkedIn")}</span>
            </ButtonWithIcon>
            <Text className="aq-mb-3 aq-text-primary">{t("or you can")}</Text>
            <ButtonWithIcon
              flat
              size="block"
              data-qa="email-signup"
              onClick={onEmailSignupClick}
            >
              <EnvelopeFill
                aria-hidden
                color={aqBootstrapTheme.palette.secondary}
                className="button-left-img"
              />
              <span className="button-text">{t("Continue with email")}</span>
            </ButtonWithIcon>
          </div>
          <div className="aq-text-center aq-pt-3">
            <Text className="aq-mb-3 aq-text-primary">
              <Trans
                i18nKey={"SIGNUP_TERMS_DISCLAIMER"}
                components={{
                  terms_link: (
                    <a
                      data-qa="terms-and-conditions"
                      href={t("/terms-and-conditions/")}
                      target="_blank"
                    />
                  ),
                  privacy_link: (
                    <a
                      data-qa="privacy-policy"
                      href={t("https://www.iubenda.com/privacy-policy/7934311")}
                      target="_blank"
                    />
                  ),
                  ethical_link: (
                    <a
                      data-qa="ethical-code"
                      href={t("/ethical-code/")}
                      target="_blank"
                    />
                  ),
                }}
                defaults="By clicking “Signup with”, you accept the <terms_link>Terms</terms_link>, <privacy_link>Privacy Policy</privacy_link> and <ethical_link>Ethical Code</ethical_link> of tryber.me"
              />
            </Text>
            <Text className="aq-pt-3 aq-text-primary">
              <Trans
                i18nKey={"SIGNUP_LOGIN_CTA"}
                components={{
                  login_link: (
                    <Link
                      to={login}
                      data-qa="login"
                      style={{ textDecoration: "none" }}
                    />
                  ),
                  strong: <strong />,
                }}
                defaults="Already have an account? <login_link><strong>Login</strong></login_link>"
              />
            </Text>
          </div>
        </CenteredCard>
      </Container>
    </PageTemplate>
  );
}
