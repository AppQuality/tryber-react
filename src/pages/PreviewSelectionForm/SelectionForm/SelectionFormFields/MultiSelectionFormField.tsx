import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import useNotAboveOption from "./useNotAboveOption";

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
  const notAboveOption = useNotAboveOption();
  return (
    <div className="aq-mb-3">
      <Field
        name={name}
        validate={(value: Option[] | Option) => {
          if (
            !value ||
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
                      if (v[v.length - 1].value === "-1") v = notAboveOption;
                      else v.splice(index, 1);
                    }
                  }
                  form.setFieldValue(
                    field.name,
                    v.value === "-1" ? [v] : v,
                    true
                  );
                }}
                label={label}
                placeholder={t("Select placeholder:::Choose value")}
                menuTargetQuery="body"
                noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
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
