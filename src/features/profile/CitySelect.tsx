import {
  FormLabel,
  PlacesAutocomplete,
} from "@appquality/appquality-design-system";
import { Field as FormikField, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

const CitySelect = ({
  name,
  label,
  onBlur,
  onChange,
  countryRestrictions,
}: {
  name: string;
  label: string;
  onBlur: () => void;
  onChange: (place?: google.maps.GeocoderResult) => void;
  countryRestrictions?: string | string[];
}) => {
  const { t, i18n } = useTranslation();
  return (
    <FormikField name={name}>
      {({ field }: FieldProps) => {
        return (
          <>
            <FormLabel label={label} htmlFor={field.name} />
            <PlacesAutocomplete
              placesProps={{
                apiKey: process.env.REACT_APP_GOOGLE_APIKEY || "",
                apiOptions: {
                  language: i18n.language,
                  region: i18n.language,
                },
                selectProps: {
                  isClearable: true,
                  value: {
                    label: field.value || "",
                    value: field.value || "",
                  },
                  noOptionsMessage: () => t("Type to search your city"),
                },
                autocompletionRequest: {
                  types: ["(cities)"],
                  componentRestrictions: { country: countryRestrictions || "" },
                },
              }}
              onBlur={onBlur}
              onChange={(places) => {
                Array.isArray(places) ? onChange(places[0]) : onChange(places);
              }}
            />
          </>
        );
      }}
    </FormikField>
  );
};

export default CitySelect;
