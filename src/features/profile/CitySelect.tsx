import {
  FormGroup,
  FormikField,
  Select,
  FormLabel,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import sitewideMessageStore from "../../redux/siteWideMessages";
import { useTranslation } from "react-i18next";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import HttpError from "../../utils/HttpError";
import API from "../../utils/api";
import countries, { LocalizedCountryNames } from "i18n-iso-countries";

export const CitySelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { values } = useFormikContext<BaseFields>();
  const { t, i18n } = useTranslation();
  const { add } = sitewideMessageStore();
  const [filteredCities, setFilteredCities] = useState<SelectType.Option[]>([]);
  const enCountries = countries.getNames("en", { select: "official" });

  useEffect(() => {
    const getCities = async (cCode: string[]) => {
      try {
        const results = await API.cities(cCode, i18n.language);
        setFilteredCities(
          results.data.map((city: { id: number; name: string }) => ({
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
    if (!values.country) return;
    const countryCodes = Object.keys(enCountries).filter(
      (key) => enCountries[key] === values.country
    );
    getCities(countryCodes);
  }, [values.country]);
  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            label={label}
            value={filteredCities.filter(
              (option) => option.value === field.value
            )}
            isDisabled={form.values.country === ""}
            options={filteredCities}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              field.onChange(v.value);
              form.setFieldValue(field.name, v.value, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
