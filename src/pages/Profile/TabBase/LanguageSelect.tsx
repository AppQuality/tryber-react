import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllLanguages } from "@appquality/languages";

export const LanguageSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [languages, setLanguages] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const results = getAllLanguages();
      setLanguages(results.map((item) => ({ label: item, value: item })));
    };
    getLanguages();
  }, []);
  const { t } = useTranslation();

  return (
    <FormikField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            placeholder={t("Search")}
            isMulti
            label={label}
            value={field.value}
            options={languages}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v, true);
            }}
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
