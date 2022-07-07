import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch } from "src/store";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugType = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  if (!data) return null;
  const options = data.bugTypes.valid.map((option) => ({
    value: option,
    label: option,
  }));
  const getSelectInfoMessage = () => {
    const { valid, invalid } = data.bugTypes;
    if (valid.length === 0 || invalid.length === 0) return null;
    return (
      <Text small>
        {valid.length <= invalid.length
          ? t(
              "for this bug are only allowed type {{valid}}:::BUGFORM_BUGDTLS_TYPE_VALID_INFOTXT",
              {
                defaultValue: "for this bug are only allowed type {{valid}}",
                valid: valid.join(", "),
                count: valid.length,
              }
            )
          : t(
              "for this bug this types are not allowed: {{invalid}}:::BUGFORM_BUGDTLS_TYPE_NOT_VALID_INFOTXT",
              {
                defaultValue:
                  "for this bug this types are not allowed: {{invalid}}",
                invalid: invalid.join(", "),
                count: invalid.length,
              }
            )}
      </Text>
    );
  };
  return (
    <FormikField name="type">
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
            label={
              <LabelWithHelper
                label={t("BUGFORM_BUGDTLS_TYPE", { defaultValue: "Bug type" })}
                title={t("BUGTYPE_TOOLTIP_TXT", { defaultValue: "Learn more" })}
                onClick={() =>
                  dispatch(
                    setBugDetailsModal({
                      open: true,
                      title: t("BUGFORM_TYPE_MODAL_TITLE", {
                        defaultValue: "Bug type",
                      }),
                      type: "type",
                    })
                  )
                }
                small
              />
            }
            placeholder={t("BUGFORM_BUGDTLS_TYPE_PLACEHOLDER", {
              defaultValue: "Select type",
            })}
            menuTargetQuery="body"
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
          />
          <ErrorMessage name={field.name} />
          {getSelectInfoMessage()}
        </>
      )}
    </FormikField>
  );
};
