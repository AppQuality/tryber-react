import { Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const UseCase = () => {
  const { t } = useTranslation();
  const { data } = useCampaignData();
  if (!data) return null;
  const options = data.useCases.map((option) => ({
    value: option.id.toString(),
    label: option.name,
  }));
  return (
    <Select
      name="usecase"
      value={[]}
      options={options}
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
