import {
  FormGroup,
  FormLabel,
  Radio,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";

interface RadioPreselectionFieldProps {
  label: string;
  name: string;
  options: string[];
}

export const RadioPreselectionField = ({
  label,
  name,
  options,
}: RadioPreselectionFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <FormGroup className="aq-mb-3">
            <FormLabel htmlFor={name} label={label} />
            {options.map((o) => (
              <Radio
                key={`${field.name}-${o}`}
                id={`${field.name}-${o}`}
                name={field.name}
                value={o}
                checked={field.value === o}
                onChange={(v) => {
                  field.onChange(v);
                  form.setFieldValue(field.name, v);
                }}
                label={o}
              />
            ))}
          </FormGroup>
        );
      }}
    </Field>
  );
};
