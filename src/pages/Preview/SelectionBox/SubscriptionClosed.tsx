import { Text, Toastr } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const SubscriptionClosed = () => {
  const { t } = useTranslation();
  return (
    <Toastr type="danger">
      <Text className="aq-text-primary">
        <strong>
          {t("Oh no, It's too late! The subscription phase is closed now.")}
        </strong>
        <p>
          {t(
            "We will wait for you in the next campaigns, so keep an eye on your dashboard!"
          )}
        </p>
      </Text>
    </Toastr>
  );
};

export default SubscriptionClosed;
