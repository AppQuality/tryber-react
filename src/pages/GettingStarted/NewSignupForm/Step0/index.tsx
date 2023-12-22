import { Button } from "@appquality/appquality-design-system";

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
      <ReferralRecap />
      <EmailInput />
      <PasswordInput />
      <PasswordRequirements />
      <Button size="block" type="primary" onClick={goToNextStep}>
        {t("SIGNUP_STEP:::continue")}
      </Button>
    </div>
  );
};

export default Step0;
