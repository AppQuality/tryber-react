import { Field } from "formik";
import { FieldProps, Select } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const PCData = ({ edit }: { edit: boolean }) => {
  const { t } = useTranslation();
  const options = [
    {
      label: "Notebook",
      value: "Notebook",
    },
    {
      label: "Desktop",
      value: "Desktop",
    },
    {
      label: "Ultrabook",
      value: "Ultrabook",
    },
    {
      label: "Gaming PC",
      value: "Gaming PC",
    },
    {
      label: "Tablet PC / Hybrid",
      value: "Tablet PC / Hybrid",
    },
  ];
  return (
    <>
      <Field name="pc_type" disabled={edit}>
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => (
          <div className="aq-mb-3">
            <Select
              isDisabled={edit}
              name={field.name}
              menuTargetQuery="body"
              label={t("Computer type")}
              placeholder={t("Search")}
              options={options}
              value={{ label: field.value, value: field.value }}
              onChange={(v) => {
                if (v == null) {
                  v = { label: "", value: "" };
                }
                field.onChange(v.value);
                form.setFieldValue(field.name, v.value, true);
                form.setFieldValue("operating_system_id", 0, true);
                form.setFieldValue("operating_system_platform", "", true);
                form.setFieldValue("operating_system_version", "", true);
              }}
              noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
            />
          </div>
        )}
      </Field>
    </>
  );
};
export default PCData;
