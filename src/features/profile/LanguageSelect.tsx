import {
  FormGroup,
  FormikField,
  Select,
  FormLabel,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import API from "../../utils/api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import HttpError from "../../utils/HttpError";

export const LanguageSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState<SelectType.Option[]>([]);
  useEffect(() => {
    const getLanguages = async () => {
      const results = await API.languages();
      setLanguages(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getLanguages();
  }, []);
  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            isMulti
            label={label}
            value={languages.filter(
              (option) => field.value?.indexOf(option.label) >= 0
            )}
            isDisabled={form.values.country === ""}
            options={languages}
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
