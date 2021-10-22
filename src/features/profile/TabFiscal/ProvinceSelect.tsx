import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { SelectProps } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { FieldProps, useFormikContext } from "formik";
import { ChangeEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import sitewideMessageStore from "../../../redux/siteWideMessages";
import API from "../../../utils/api";
import { GeoDbRegion } from "../../../utils/geoDb";

export const ProvinceSelect = ({
  name,
  onChange,
  label,
}: ProvinceSelectProps) => {
  const { add } = sitewideMessageStore();
  const { values } = useFormikContext<FiscalModalFields>();
  const { t, i18n } = useTranslation();
  const getAsyncOptions = useMemo(() => {
    return async (start: number, search?: string) => {
      const limit = 100;
      let options: SelectType.Option[] = [];
      let more = false;

      try {
        const results = await API.regions({
          countryId: values.countryCode,
          languageCode: i18n.language,
          offset: start,
          search: search,
          limit: limit,
        });

        if (values.countryCode === "IT") {
          results.data = results.data.filter(
            (res) => !res.fipsCode // exclude regions
          );
        }
        options = results.data.map((province: GeoDbRegion) => ({
          label: province.name,
          value: province.isoCode,
          id: province.wikiDataId,
        }));
        // add current to the array if not present
        options = [...options];
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
      {({ form, field }: FieldProps) => (
        <FormGroup>
          <Select
            label={label}
            value={field.value}
            name={field.name}
            options={getAsyncOptions}
            onBlur={(e: ChangeEvent) => {
              form.setFieldTouched(name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              if (onChange) {
                onChange(v);
              }
              field.onChange(v.value);
              form.setFieldValue(name, v, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
