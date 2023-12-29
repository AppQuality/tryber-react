import {
  Button,
  CSSGrid,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import signupImage from "./assets/signup.png";
import { SignupForm } from "./SignupForm";
import { HalfColumnButton } from "src/features/HalfColumnButton";

interface SignupMailSocialProps {
  redirectUrl: string;
  formId?: string;
}

export const SignupMailSocial = ({ redirectUrl }: SignupMailSocialProps) => {
  const { t } = useTranslation();
  const signupWithFb = () => {
    window.location.href = `/wp-admin/admin-ajax.php?loc=${redirectUrl}&action=facebook_oauth_redirect&log=0`;
  };
  const signupWithLn = () => {
    window.location.href = `/wp-admin/admin-ajax.php?loc=${redirectUrl}&action=linkedin_oauth_redirect&log=0`;
  };
  return (
    <div className="aq-mb-3">
      <CSSGrid gutter="50px" rowGap="1rem" min="220px">
        <SignupForm redirectUrl={redirectUrl} />
        <div
          className="signup-with-email"
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Title className="aq-mb-2" size="xs" as="h5">
              {t("Log in with an existing account")}
            </Title>
            <Text className="aq-mb-3">
              {t(
                "Connect AppQuality to one of your accounts, this will make it easier for you to access your dashboard"
              )}
            </Text>
            <CSSGrid min="50%" max="75%" gutter="0" fill="true">
              <HalfColumnButton
                kind="primary"
                size="block"
                id="signup-with-fb"
                className="aq-mb-3"
                flat
                onClick={signupWithFb}
              >
                {t("Facebook")}
              </HalfColumnButton>
            </CSSGrid>
            <CSSGrid min="50%" max="75%" gutter="0" fill="true">
              <HalfColumnButton
                kind="info"
                size="block"
                id="signup-with-ln"
                className="aq-mb-3"
                flat
                onClick={signupWithLn}
              >
                {t("LinkedIn")}
              </HalfColumnButton>
            </CSSGrid>
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              alt={t("Become an AppQuality Tester")}
              src={signupImage}
            />
          </div>
        </div>
      </CSSGrid>
    </div>
  );
};
