import {
  FormGroup,
  FormikField,
  Select,
  FormLabel,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const [filteredCities, setFilteredCities] = useState<SelectType.Option[]>([]);
  // const filteredCities = [{label:'',value:''}];
  useEffect(() => {
    const getCities = async (cCode: string) => {
      const urlps = new URLSearchParams({
        countryIds: cCode,
        languageCode: i18n.language,
      });

      const params = "?" + urlps.toString();
      try {
        const res = await fetch(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities" + params,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "0b9310c254mshe16dee424f318b3p1d40b4jsn442890bc6db1",
            },
          }
        );
        if (!res.ok) throw new Error("buuuu");
        const cities = await res.json();
        setFilteredCities(
          cities.data.map((city: { id: number; name: string }) => ({
            label: city.name,
            value: city.name,
            id: city.id,
          }))
        );
      } catch (err) {
        // add error message
      }
    };
    if (!countryCode) return;
    getCities(countryCode);
  }, [countryCode]);
  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            label={label}
            value={field.value}
            isDisabled={form.values.country === ""}
            options={filteredCities}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
