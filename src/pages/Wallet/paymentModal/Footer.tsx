import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

export const Footer: React.FunctionComponent<PaymentModalFooterProps> = () => {
  const { t } = useTranslation();
  const { isValid, dirty, errors, values, setFieldValue } =
    useFormikContext<PaymentFormType>();
  const decrementStep = () => {
    setFieldValue("step", values.step - 1);
  };
  const incrementStep = () => {
    if (isValid && dirty) setFieldValue("step", values.step + 1);
  };
  return (
    <div>
      {values.step > 0 && (
        <Button onClick={decrementStep} className="aq-mr-3">
          {t("Back")}
        </Button>
      )}
      <Button onClick={incrementStep}>{t("Continue")}</Button>
    </div>
  );
};
