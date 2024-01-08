import {
  FormikField,
  ErrorMessage,
  FormGroup,
  FormLabel,
  DateInput,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { parse, isDate, isValid } from "date-fns";
import i18n from "src/i18n";
import { useTranslation } from "react-i18next";

const BirthdayInput = () => {
  const { t } = useTranslation();
  const now = new Date();
  const maxDate = new Date(
    Date.UTC(now.getFullYear() - 18, now.getMonth(), now.getDate())
  );
  function validateDateString(value: string) {
    let error;
    const parsedDate = isDate(value)
      ? value
      : parse(value, "dd/MM/yyyy", new Date());

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
            id={field.name}
            name={field.name}
            value={field.value}
            maxDate={maxDate}
            i18n={{
              locale: i18n.language,
              dateFormat: "DD/MM/YYYY",
              placeholder: "29/11/1991",
              setText: t("Set"),
              cancelText: t("Cancel"),
              buttonTitle: t("Select your birth date"),
            }}
            onCancel={() => form.setFieldTouched(field.name)}
            onChange={(event) => {
              field.onChange(event.target.value);
              form.setFieldValue(field.name, event.target.value, true);
            }}
            inputProps={{
              required: true,
              "aria-required": true,
              onBlur: () => form.setFieldTouched(field.name),
            }}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default BirthdayInput;
