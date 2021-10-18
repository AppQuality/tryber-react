import {
  FormGroup,
  FormikField,
  Select,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import csc from "country-state-city";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const CitySelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { values } = useFormikContext();
  const { t } = useTranslation();
  const [filteredCities, setFilteredCities] = useState([]);
  useEffect(() => {
    // @ts-ignore
    console.log(values["country"]);
  }, [values]);
  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label={label} />
          <Select
            name={field.name}
            label={t("Domicile")}
            value={field.value}
            isDisabled={form.values.country === ""}
            options={filteredCities}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
