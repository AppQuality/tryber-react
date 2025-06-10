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
  validate,
}: {
  name: string;
  label: string;
  onBlur: () => void;
  onChange: (place?: google.maps.GeocoderResult) => void;
  countryRestrictions?: string | string[];
  validate?: boolean;
}) => {
  const { t, i18n } = useTranslation();

  const onValidate = (value: string) => {
    if (!value && validate) {
      return t("This is a required field");
    }
  };

  return (
    <FormikField name={name} validate={onValidate}>
      {({ field }: FieldProps) => {
        return (
          <>
            <FormLabel label={label} htmlFor={field.name} />
            <PlacesAutocomplete
              placesProps={{
                apiKey: "",
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
                  types: [
                    "administrative_level_area_1",
                    "administrative_level_area_2",
                    "administrative_level_area_3",
                  ],
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
