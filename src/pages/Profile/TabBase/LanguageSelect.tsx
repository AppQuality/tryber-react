import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { useTranslation } from "react-i18next";

export const LanguageSelect = ({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: SelectType.Option[];
}) => {
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
            noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
