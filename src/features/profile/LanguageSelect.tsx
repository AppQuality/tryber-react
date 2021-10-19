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
  options,
}: {
  name: string;
  label: string;
  options: SelectType.Option[];
}) => {
  const { t, i18n } = useTranslation();

  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            isMulti
            label={label}
            value={options.filter(
              (option) => field.value?.indexOf(option.label) >= 0
            )}
            isDisabled={form.values.country === ""}
            options={options}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              const newValues = v.map(
                (option: SelectType.Option) => option.label
              );
              form.setFieldValue(field.name, newValues, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
