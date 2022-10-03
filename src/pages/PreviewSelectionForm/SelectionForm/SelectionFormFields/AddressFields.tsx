import {
  ErrorMessage,
  FormikField,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import CountrySelect from "src/features/CountrySelect";
import CitySelect from "src/features/CitySelect";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface AddressFieldsProps {
  label: string;
  countryField: string;
  cityField: string;
  countryCode: string;
}

export const AddressFields = ({
  label,
  countryField,
  cityField,
  countryCode,
}: AddressFieldsProps) => {
  const { t } = useTranslation();
  const [currentCountryCode, setCurrentCountryCode] =
    useState<string>(countryCode);

  return (
    <div className="aq-mb-3">
      <FormikField name={countryField}>
        {({ form }: FieldProps) => {
          return (
            <CountrySelect
              key={countryField}
              name={countryField}
              label={label}
              onChange={(v: SelectType.Option) => {
                form.setFieldValue(cityField, "");
                form.setFieldTouched(cityField);
                setCurrentCountryCode(v.code);
              }}
              validate
            />
          );
        }}
      </FormikField>
      <FormikField name={countryField}>
        {({ form }: FieldProps) => {
          return (
            <>
              <CitySelect
                key={cityField}
                name={cityField}
                label=""
                onBlur={() => {
                  form.setFieldTouched(cityField);
                }}
                countryRestrictions={currentCountryCode}
                onChange={(place) => {
                  if (!place) {
                    form.setFieldValue(cityField, "", true);
                    return;
                  }
                  const fields = place.address_components;
                  const city = fields.find(
                    (field) => field.types.indexOf("locality") >= 0
                  );
                  if (!city) {
                    form.setFieldError(
                      cityField,
                      t(
                        "We couldn't find a city with that name, please search again"
                      )
                    );
                  } else {
                    form
                      .getFieldProps(cityField)
                      .onChange(city?.long_name || "");
                    form.setFieldValue(cityField, city?.long_name || "", true);
                  }
                }}
                validate
              />
              <ErrorMessage name={cityField} />
            </>
          );
        }}
      </FormikField>
    </div>
  );
};
