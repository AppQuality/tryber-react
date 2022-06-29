import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export const UseCase = () => {
  const { t } = useTranslation();
  return (
    <Select
      name="usecase"
      value={[]}
      options={[]}
      label={t("BUGFORM_BUGDTLS_USECASE", { defaultValue: "Usecase task" })}
      placeholder={t("BUGFORM_BUGDTLS_USECASE_PLACEHOLDER", {
        defaultValue: "Select usecase",
      })}
      menuTargetQuery="body"
      onChange={() => null}
      noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
    />
  );
};
