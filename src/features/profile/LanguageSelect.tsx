import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";

export const LanguageSelect = ({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: SelectType.Option[];
}) => {
  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            isMulti
            label={label}
            value={field.value}
            options={options}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
