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
}: {
  name: string;
  label: string;
  onBlur: () => void;
  onChange: (place: google.maps.GeocoderResult) => void;
}) => {
  const { t, i18n } = useTranslation();
  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => {
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
                  noOptionsMessage: () => t("Select your city"),
                },
                autocompletionRequest: {
                  types: ["(cities)"],
                },
              }}
              onBlur={onBlur}
              onChange={(places) => {
                onChange(places[0]);
              }}
            />
          </>
        );
      }}
    </FormikField>
  );
};

export default CitySelect;
