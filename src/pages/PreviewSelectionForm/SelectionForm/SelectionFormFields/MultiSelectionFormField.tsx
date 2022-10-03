import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

interface MultiSelectionFormFieldProps {
  name: string;
  label: string;
  options: Option[];
}

export const MultiSelectionFormField = ({
  name,
  label,
  options,
}: MultiSelectionFormFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="aq-mb-3">
      <Field
        name={name}
        validate={(value: Option[] | Option) => {
          if (
            (value && "value" in value && value.value === "") ||
            (Array.isArray(value) && !value.length)
          ) {
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
                value={field.value}
                onBlur={() => {
                  form.setFieldTouched(field.name);
                }}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  if (Array.isArray(v)) {
                    const index = v.findIndex(
                      (element) => element.value === "-1"
                    );
                    if (index !== -1 && v.length > 1) {
                      if (v[v.length - 1].value === "-1")
                        v = { label: "Nessuna delle precedenti", value: "-1" };
                      else v.splice(index, 1);
                    }
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
