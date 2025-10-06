import { Text, Toastr } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const AlreadyApplied = () => {
  const { t } = useTranslation();
  return (
    <Toastr type="warning">
      <Text className="aq-text-primary">
        <strong>{t("You have already applied for this campaign.")}</strong>
        <p>
          {t(
            "We are currently reviewing applications and will notify you of any updates."
          )}
        </p>
      </Text>
    </Toastr>
  );
};

export default AlreadyApplied;
