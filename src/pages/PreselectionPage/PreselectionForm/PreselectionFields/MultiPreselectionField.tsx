import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

interface MultiPreselectionFieldProps {
  name: string;
  label: string;
  options: Option[];
}

export const MultiPreselectionField = ({
  name,
  label,
  options,
}: MultiPreselectionFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="aq-mb-3">
      <Field
        name={name}
        validate={(value: Option[]) => {
          if (!value?.length) {
            return t("This is a required field");
          }
        }}
      >
        {({ field, form }: FieldProps) => {
          return (
            <FormGroup>
              <Select
                name={field.name}
                options={options}
                isClearable={false}
                value={field.value}
                onBlur={() => {
                  form.setFieldTouched(field.name);
                }}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  form.setFieldValue(field.name, v, true);
                }}
                label={label}
                placeholder={"Choose value"}
                menuTargetQuery="body"
                noOptionsMessage={() => "No options"}
                isMulti
              />
              <ErrorMessage name={name} />
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};
