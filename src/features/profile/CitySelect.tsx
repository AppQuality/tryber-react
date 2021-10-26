import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { useMemo, useState } from "react";
import sitewideMessageStore from "../../redux/siteWideMessages";
import { useTranslation } from "react-i18next";
import HttpError from "../../utils/HttpError";
import API from "../../utils/api";
import countries from "i18n-iso-countries";
import { GeoDbCity } from "../../utils/geoDb";
import { BaseFields } from "./types";

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
  const enCountries = countries.getNames("en", { select: "official" });

  const getAsyncOptions = useMemo(() => {
    return async (start: number, search?: string) => {
      const limit = 100;
      let options: SelectType.Option[] = [];
      let more = false;
      const countryCodes = Object.keys(enCountries).filter(
        (key) => enCountries[key] === values.country
      );
      try {
        const results = await API.cities({
          countryIds: countryCodes,
          languageCode: i18n.language,
          offset: start,
          search: search,
          limit: limit,
        });
        const filteredCities = results.data.filter(
          (res) => res.type === "CITY"
        );
        options = filteredCities.map((city: GeoDbCity) => ({
          label: city.name,
          value: city.name,
          id: city.id,
        }));
        // add current to the array if not present
        options = [...options, values.city];
        const { totalCount, currentOffset } = results.metadata;
        more = !!(totalCount - (limit + currentOffset));
      } catch (e) {
        const { message, statusText } = e as HttpError;
        add({
          type: "danger",
          expire: false,
          message: `${t(
            "Error retrieving cities from GeoDb endpoint: "
          )} ${statusText} - ${message}`,
        });
      }
      return new Promise<{ more: boolean; results: SelectType.Option[] }>(
        (resolve, reject) => {
          return resolve({
            results: options,
            more: more,
          });
        }
      );
    };
  }, [values.country, values.city]);

  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            label={label}
            defaultValue={field.value}
            value={field.value}
            isDisabled={form.values.country === ""}
            options={getAsyncOptions}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              field.onChange(v.value);
              form.setFieldValue(field.name, v, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
