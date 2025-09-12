import { Text, Toastr } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const CapReached = () => {
  const { t } = useTranslation();
  return (
    <Toastr type="danger">
      <Text className="aq-text-primary">
        <strong>{t("The campaign has reached its maximum capacity.")}</strong>
        <p>
          {t(
            "We are not accepting new applications at this time. Check back later if new spots open up!"
          )}
        </p>
      </Text>
    </Toastr>
  );
};

export default CapReached;
