import {
  Select,
  SelectType,
  FormikField,
  FieldProps,
  ErrorMessage,
  FormGroup,
} from "@appquality/appquality-design-system";
import { useMemo } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import countries from "i18n-iso-countries";
import { ChangeEvent } from "react";

const CountrySelect = ({
  name,
  label,
  onChange,
}: {
  name: string;
  label: string;
  onChange?: (v: SelectType.Option) => void;
}) => {
  const { t } = useTranslation();
  const enCountries = countries.getNames("en", { select: "official" });
  const options = useMemo(
    () =>
      Object.entries(
        countries.getNames(i18next.language, { select: "official" })
      ).map(([locale, name]) => ({
        label: name,
        code: locale,
        value: enCountries[locale],
      })),
    []
  );
  return (
    <FormikField name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form,
      }: FieldProps) => {
        return (
          <FormGroup>
            <Select
              name={name}
              label={label}
              placeholder={t("Select a country")}
              value={{ label: field.value, value: field.value }}
              onBlur={(e: ChangeEvent) => {
                form.setFieldTouched(name);
              }}
              onChange={(v) => {
                if (v === null) {
                  v = { label: "", value: "" };
                }
                if (onChange) {
                  onChange(v);
                }
                field.onChange(v.value);
                form.setFieldValue(name, v.value, true);
              }}
              options={options}
            />
            <ErrorMessage name={name} />
          </FormGroup>
        );
      }}
    </FormikField>
  );
};

export default CountrySelect;
