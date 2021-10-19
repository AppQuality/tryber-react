import {
  FormGroup,
  FormikField,
  Select,
  FormLabel,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import sitewideMessageStore from "../../redux/siteWideMessages";
import { useTranslation } from "react-i18next";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import HttpError from "../../utils/HttpError";

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
  const { add } = sitewideMessageStore();
  const [filteredCities, setFilteredCities] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getCities = async (cCode: string) => {
      const urlps = new URLSearchParams({
        countryIds: cCode,
        languageCode: i18n.language,
      });
      const params = "?" + urlps.toString();
      try {
        const response = await fetch(
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
        const result = await response.json();
        if (!response.ok)
          throw new HttpError(
            response.status,
            response.statusText,
            result.message
          );
        setFilteredCities(
          result.data.map((city: { id: number; name: string }) => ({
            label: city.name,
            value: city.name,
            id: city.id,
          }))
        );
      } catch (err) {
        const { message } = err as HttpError;
        add({
          type: "danger",
          expire: false,
          message: t("Error retrieving cities from GeoDb endpoint: ") + message,
        });
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
