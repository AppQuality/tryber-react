import {
  FormGroup,
  FormikField,
  Select,
  FormLabel,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { City } from "country-state-city";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ICity } from "country-state-city/dist/lib/interface";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";

export const CitySelect = ({
  name,
  label,
  countryCode,
}: {
  name: string;
  label: string;
  countryCode?: string;
}) => {
  const { values } = useFormikContext();
  const { t } = useTranslation();
  const [filteredCities, setFilteredCities] = useState<SelectType.Option[]>([]);
  // const filteredCities = [{label:'',value:''}];
  useEffect(() => {
    if (countryCode) {
      let cities = City.getCitiesOfCountry(countryCode);
      if (cities) {
        let mappedCities = cities.map((city) => ({
          label: city.name,
          value: city.name,
        }));
        setFilteredCities(mappedCities);
      }
    }
  }, [countryCode]);
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
