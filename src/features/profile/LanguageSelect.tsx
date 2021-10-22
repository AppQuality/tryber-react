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
            value={field.value}
            isDisabled={form.values.country === ""}
            options={options}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
