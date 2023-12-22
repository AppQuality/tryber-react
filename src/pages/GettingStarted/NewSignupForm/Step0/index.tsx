import { Button, Text, Title } from "@appquality/appquality-design-system";

import { useTranslation } from "react-i18next";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { PasswordRequirements } from "./PasswordRequirements";
import { ReferralRecap } from "./ReferralRecap";
import { useNextStep } from "./useNextStep";

const Step0 = () => {
  const goToNextStep = useNextStep();
  const { t } = useTranslation();
  return (
    <div data-qa="mail-signup-first-step">
      <div className="aq-my-3">
        <Title size="s" className="aq-mb-2">
          {t("Create your account")}
        </Title>
        <ReferralRecap />
        <Text small className="aq-mb-2">
          {t("Fields marked with asterisk (*) are required.")}
        </Text>
      </div>
      <EmailInput className="aq-mb-3" />
      <PasswordInput className="aq-mb-2" />
      <PasswordRequirements />
      <Button size="block" type="primary" onClick={goToNextStep}>
        {t("SIGNUP_STEP:::continue")}
      </Button>
    </div>
  );
};

export default Step0;
