import {
  FormGroup,
  FormLabel,
  Input,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { Field, FieldProps, useFormikContext } from "formik";

export const TextAdditionalField = ({
  label,
  name,
  validation,
}: {
  label: string;
  name: string;
  validation: string;
}) => {
  const ctx = useFormikContext();

  const validate = (value: string) => {
    if (!value) {
      return "Required";
    }
    if (!new RegExp(validation).test(value)) {
      return "Invalid";
    }
  };

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <FormGroup className="aq-mb-3">
            {label && <FormLabel htmlFor={name} label={label} />}
            <div className="input-group">
              <Input
                id={name}
                type="text"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{ ...field }}
              />
            </div>
            <ErrorMessage name={name} />
          </FormGroup>
        );
      }}
    </Field>
  );
};
