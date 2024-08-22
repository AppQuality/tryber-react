import {
  DateInput,
  ErrorMessage,
  FormGroup,
  FormLabel,
  FormikField,
} from "@appquality/appquality-design-system";
import { isDate, isValid, parse } from "date-fns";
import { FieldProps } from "formik";
import { useTranslation } from "react-i18next";

const BirthdayInput = () => {
  const { t } = useTranslation();
  const now = new Date();
  const maxDate = new Date(
    Date.UTC(now.getFullYear() - 16, now.getMonth(), now.getDate())
  );
  function validateDateString(value: string) {
    let error;
    const parsedDate = isDate(value)
      ? value
      : parse(value, "yyyy-MM-dd", new Date());

    if (!isValid(parsedDate)) {
      error = t("SIGNUP_FORM:::Invalid date");
    }
    if (parsedDate > maxDate) {
      error = t("SIGNUP_FORM:::You must be at least 18 years old");
    }
    return error;
  }
  return (
    <FormikField name="birthdate" validate={validateDateString}>
      {({ meta, field, form }: FieldProps) => (
        <FormGroup data-qa="birthdate-formgroup">
          <FormLabel
            htmlFor={field.name}
            label={
              <span>
                {t("DATE_OF_BIRTH:::SignupFrom Step1")}{" "}
                <span aria-hidden>*</span>
              </span>
            }
          />
          <DateInput
            isInvalid={meta.touched && typeof meta.error == "string"}
            id={field.name}
            name={field.name}
            value={field.value}
            maxDate={maxDate}
            onChange={(event) => {
              field.onChange(event.target.value);
              form.setFieldValue(field.name, event.target.value, true);
            }}
            inputProps={{
              required: true,
              "aria-required": true,
              "aria-invalid": meta.touched && typeof meta.error == "string",
              "aria-errormessage": `${field.name}-error`,
              onBlur: () => form.setFieldTouched(field.name),
            }}
          />
          <ErrorMessage id={`${field.name}-error`} name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default BirthdayInput;
