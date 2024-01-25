import { Title } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

const ReferralRecap = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<FormValues>();
  if (!values.referral) return null;
  return (
    <Title size="xs" className="aq-mb-2">
      {t("You are creating your account with referral ID {{referral}}", {
        referral: values.referral,
      })}
    </Title>
  );
};

export { ReferralRecap };
