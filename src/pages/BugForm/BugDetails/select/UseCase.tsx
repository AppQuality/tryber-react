import {
  ErrorMessage,
  FieldProps,
  Select,
  FormikField,
} from "@appquality/appquality-design-system";
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
    <FormikField name="useCase">
      {({ field, meta, form }: FieldProps) => (
        <>
          <Select
            name={field.name}
            options={options}
            isClearable={false}
            value={options.filter((o) => o.value === field.value)}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              form.setFieldValue(field.name, v.value);
            }}
            label={t("BUGFORM_BUGDTLS_USECASE", {
              defaultValue: "Usecase task",
            })}
            placeholder={t("BUGFORM_BUGDTLS_USECASE_PLACEHOLDER", {
              defaultValue: "Select usecase",
            })}
            menuTargetQuery="body"
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
          />
          <ErrorMessage name={field.name} />
        </>
      )}
    </FormikField>
  );
};
