import React from "react";
import { Button } from "../stories/button/Button";
import { useTranslation } from "react-i18next";
import { Paragraph, H5 } from "../stories/typography/Typography";
import {SignupForm} from "./SignupForm";
import signupImage from "../pages/assets/group-236.png";
import {CSSGrid} from "../stories/layout/Layout";

interface SignupMailSocialProps {
  redirectUrl?: string;
  formId?: string
}

export const SignupMailSocial = ({ redirectUrl= '/my-dashboard/' }: SignupMailSocialProps) => {
  const { t } = useTranslation();
  const signupWithFb = () => {
    window.location.href = `/wp-admin/admin-ajax.php?loc=${redirectUrl}&action=facebook_oauth_redirect&log=0`;
  };
  const signupWithLn = () => {
    window.location.href =
      `/wp-admin/admin-ajax.php?loc=${redirectUrl}&action=linkedin_oauth_redirect&log=0`;
  };
  return (
    <CSSGrid gutter='50px' rowGap='1rem' min='220px'>
      <SignupForm redirectUrl={redirectUrl} />
      <div className="signup-with-email" style={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between'}}>
        <div>
          <H5>{t("signup-with-social")}</H5>
          <Paragraph>{t("signup-with-social-description")}</Paragraph>
          <CSSGrid min='70px' fill={true}>
            <div style={{gridColumn: 'auto / span 3'}}>
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
            </div>
          </CSSGrid>
        </div>
        <div>
          <img alt={t('become-a-tester')} src={signupImage} />
        </div>
      </div>
    </CSSGrid>
  );
};
