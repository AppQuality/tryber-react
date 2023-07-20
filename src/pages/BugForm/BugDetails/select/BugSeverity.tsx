import {
  Select,
  FormikField,
  ErrorMessage,
  FieldProps,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LabelWithHelper } from "src/pages/BugForm/LabelWithHelper/LabelWithHelper";
import { setBugDetailsModal } from "src/pages/BugForm/bugFormSlice";
import { useAppDispatch, useAppSelector } from "src/store";
import useCampaignData from "src/pages/BugForm/useCampaignData";

export const BugSeverity = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignData();
  const isPublicPage = useAppSelector(
    (state) => state.publicUserPages.isPublic
  );

  if (!data) return null;
  const options = data.bugSeverity.valid.map((option) => ({
    value: option,
    label: option,
  }));
  const getSelectInfoMessage = () => {
    const { valid, invalid } = data.bugSeverity;
    if (valid.length === 0 || invalid.length === 0) return null;
    return (
      <Text small>
        {valid.length <= invalid.length
          ? t(
              "for this bug are only allowed severities of type {{valid}}:::BUGFORM_BUGDTLS_SEVERITY_VALID_INFOTXT",
              {
                defaultValue:
                  "for this bug are only allowed severities of type {{valid}}",
                valid: valid.join(", "),
                count: valid.length,
              }
            )
          : t(
              "for this bug this severities are not allowed: {{invalid}}:::BUGFORM_BUGDTLS_SEVERITY_NOT_VALID_INFOTXT",
              {
                defaultValue:
                  "for this bug this severities are not allowed: {{invalid}}",
                invalid: invalid.join(", "),
                count: invalid.length,
              }
            )}
      </Text>
    );
  };
  return (
    <FormikField name="severity">
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
                label={t("BUGFORM_BUGDTLS_SEVERITY", {
                  defaultValue: "Bug severity",
                })}
                title={t("BUGSEVERITY_TOOLTIP_TXT", {
                  defaultValue: "Learn more",
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
                hideHelper={isPublicPage}
              />
            }
            placeholder={t("BUGFORM_BUGDTLS_SEVERITY_PLACEHOLDER", {
              defaultValue: "Select severity",
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
