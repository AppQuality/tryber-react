import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const Devices = () => {
  const { t } = useTranslation();
  const { data, device } = useCampaignData();
  if (!data) return null;
  //@ts-ignore
  console.log(device[0].device.model);
  const options =
    device?.map((option) => ({
      value: option.id.toString(),
      label: `${option.type} ${
        "manufacturer" in option.device
          ? option.device.manufacturer.concat(" ", option.device.model)
          : ""
      }${"pc_type" in option.device ? option.device.pc_type : ""}`,
    })) || [];

  return (
    <FormikField name="device">
      {({ field, form }: FieldProps) => (
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
            label={t("BUGFORM_BUGDTLS_TESTDVC", {
              defaultValue: "Test device",
            })}
            placeholder={t("BUGFORM_BUGDTLS_TESTDVC_PLACEHOLDER", {
              defaultValue: "Select device",
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
