import {
  Select,
  FormikField,
  ErrorMessage,
  FieldProps,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch } from "src/store";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugSeverity = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  if (!data) return null;
  const options = data.bugSeverity.valid.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <FormikField name="severity">
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
            label={
              <LabelWithHelper
                label={t("BUGFORM_BUGDTLS_SEVERITY", {
                  defaultValue: "Bug severity",
                })}
                onClick={() =>
                  dispatch(
                    setBugDetailsModal({
                      open: true,
                      title: t("BUGFORM_SEVERITY_MODAL_TITLE", {
                        defaultValue: "Bug severity",
                      }),
                      type: "severity",
                    })
                  )
                }
                small
              />
            }
            placeholder={t("BUGFORM_BUGDTLS_SEVERITY_PLACEHOLDER", {
              defaultValue: "Select severity",
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
