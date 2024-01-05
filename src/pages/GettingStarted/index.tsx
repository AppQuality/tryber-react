import {
  Button,
  Text,
  DatepickerGlobalStyle,
  Title,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { EnvelopeFill } from "react-bootstrap-icons";
import { ButtonWithIcon } from "src/features/ButtonWithIcon";
import { CenteredCard } from "src/features/CenteredCard";
import { LangMenu } from "src/features/LangMenu";
import NotLoggedOnly from "src/features/NotLoggedOnly";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";

export default function GettingStarted() {
  const { t } = useTranslation();
  const dashboard = useLocalizeRoute("my-dashboard");
  const emailSignup = useLocalizeRoute("getting-started/signup");
  const login = useLocalizeRoute("login");
  return (
    <NotLoggedOnly redirect={{ url: dashboard }}>
      <DatepickerGlobalStyle />
      <LangMenu
        className="aq-mt-3"
        itLink="/it/getting-started/"
        esLink="/es/getting-started/"
        enLink="/getting-started/"
      />
      <Title style={{ textAlign: "center" }} size="l" as={"h1"}>
        {t("Signup for Tryber")}
      </Title>
      <CenteredCard>
        <div className="card-body aq-text-center">
          <img
            aria-hidden
            src="/static/trybers-login.svg"
            alt="tryber-login"
            className="aq-mb-4"
          />
          <ButtonWithIcon
            forwardedAs="a"
            href={`/wp-admin/admin-ajax.php?loc=${dashboard}&action=facebook_oauth_redirect&log=0`}
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
            href={`/wp-admin/admin-ajax.php?loc=${dashboard}&action=linkedin_oauth_redirect&log=0`}
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
            size="block"
            flat
            forwardedAs="a"
            href={emailSignup}
            data-qa="email-signup"
          >
            <img
              aria-hidden
              alt="login with linkedin"
              src={EnvelopeFill}
              className="button-left-img"
            />
            <EnvelopeFill
              aria-hidden
              color={aqBootstrapTheme.palette.secondary}
              className="button-left-img"
            />
            <span className="button-text">{t("Continue with email")}</span>
          </ButtonWithIcon>
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
        </div>
      </CenteredCard>
    </NotLoggedOnly>
  );
}
