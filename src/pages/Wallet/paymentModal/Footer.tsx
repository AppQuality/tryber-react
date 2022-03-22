import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export const Footer: React.FunctionComponent<PaymentModalFooterProps> = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Button>{t("Continue")}</Button>
    </div>
  );
};
