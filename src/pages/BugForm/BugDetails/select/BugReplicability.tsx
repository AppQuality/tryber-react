import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { useAppDispatch } from "src/store";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugReplicability = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  if (!data) return null;
  const options = data.bugReplicability.valid.map((option) => ({
    value: option,
    label: option,
  }));
  const getSelectInfoMessage = () => {
    const { valid, invalid } = data.bugReplicability;
    if (valid.length === 0 || invalid.length === 0) return null;
    return (
      <Text small>
        {valid.length <= invalid.length
          ? t(
              "for this bug are only allowed replicability of type {{valid}}:::BUGFORM_BUGDTLS_REPLICABILITY_VALID_INFOTXT",
              {
                defaultValue:
                  "for this bug are only allowed replicability of type {{valid}}",
                valid: valid.join(", "),
                count: valid.length,
              }
            )
          : t(
              "for this bug this replicability are not allowed: {{invalid}}:::BUGFORM_BUGDTLS_REPLICABILITY_NOT_VALID_INFOTXT",
              {
                defaultValue:
                  "for this bug this replicability are not allowed: {{invalid}}",
                invalid: invalid.join(", "),
                count: invalid.length,
              }
            )}
      </Text>
    );
  };
  return (
    <FormikField name="replicability">
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
                label={t("BUGFORM_BUGDTLS_REPLICABILTY", {
                  defaultValue: "Bug replicability",
                })}
                onClick={() =>
                  dispatch(
                    setBugDetailsModal({
                      open: true,
                      title: t("BUGFORM_REPLICABILTY_MODAL_TITLE", {
                        defaultValue: "Bug replicability",
                      }),
                      type: "replicability",
                    })
                  )
                }
                small
              />
            }
            placeholder={t("BUGFORM_BUGDTLS_REPLICABILTY_PLACEHOLDER", {
              defaultValue: "Select replicability",
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
