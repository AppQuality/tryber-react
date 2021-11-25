import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  FormikField,
  FormLabel,
  Input,
  Select,
} from "@appquality/appquality-design-system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CufTextField = ({
  fieldProps,
  label,
  placeholder,
}: {
  fieldProps: FieldProps;
  label: string;
  placeholder?: string;
}) => {
  const { field } = fieldProps;
  return (
    <>
      <FormLabel htmlFor={field.name} label={label} />
      <Input
        id={field.name}
        type="text"
        placeholder={placeholder}
        value={field.value}
        onChange={(val) => {
          fieldProps.form.setFieldTouched(field.name);
          fieldProps.form.setFieldValue(field.name, val);
        }}
      />
    </>
  );
};
const CufSelectField = ({
  fieldProps,
  options,
  label,
  id,
  allowOther,
}: {
  fieldProps: FieldProps;
  options: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
  label: string;
  id: number;
  allowOther?: boolean;
}) => {
  const { t } = useTranslation();
  const { field, form } = fieldProps;
  const [selectOptions, setOptions] = useState<SelectOptionType[]>([]);
  useEffect(() => {
    let buildOptions = options.map((o) => ({
      label: o.name,
      value: o.id.toString(),
      field_id: id,
    }));
    if (field.value && "is_candidate" in field.value)
      buildOptions.push(field.value);
    setOptions(buildOptions);
  }, [options, field.value]);

  const optionalArgs = allowOther
    ? {
        onCreate: (val: string) => {
          const newOption = { label: val, value: val, is_candidate: true };
          form.setFieldValue(field.name, newOption);
          setOptions([...selectOptions, newOption]);
        },
      }
    : null;
  return (
    <Select
      placeholder={t("Search")}
      menuTargetQuery={"body"}
      name={field.name}
      options={selectOptions}
      label={label}
      value={field.value}
      onChange={(v) => {
        fieldProps.form.setFieldTouched(field.name);
        if (!v) {
          form.setFieldValue(field.name, { label: "", value: "" });
        } else {
          form.setFieldValue(field.name, v);
        }
      }}
      {...optionalArgs}
    />
  );
};
const CufMultiSelectField = ({
  fieldProps,
  options,
  label,
  id,
}: {
  fieldProps: FieldProps;
  options: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
  label: string;
  id: number;
  allowOther?: boolean;
}) => {
  const { t } = useTranslation();
  const { field, form } = fieldProps;
  const [selectOptions, setOptions] = useState<SelectOptionType[]>([]);
  useEffect(() => {
    let buildOptions = options.map((o) => ({
      label: o.name,
      value: o.id.toString(),
      field_id: id,
    }));
    if (Array.isArray(field.value)) {
      field.value.forEach((val) => {
        if ("is_candidate" in val) buildOptions.push(val);
      });
    }
    setOptions(buildOptions);
  }, [options, field.value]);

  const optionalArgs = {
    onCreate: (val: string) => {
      const newOption = { label: val, value: val, is_candidate: true };
      form.setFieldValue(field.name, [
        ...field.value,
        { value: val, label: val, is_candidate: true },
      ]);
      setOptions([...selectOptions, newOption]);
    },
  };
  return (
    <Select
      placeholder={t("Search")}
      isMulti
      menuTargetQuery={"body"}
      name={field.name}
      options={selectOptions}
      label={label}
      value={field.value}
      onChange={(v) => {
        fieldProps.form.setFieldTouched(field.name);
        if (!v) {
          form.setFieldValue(field.name, { label: "", value: "" });
        } else {
          form.setFieldValue(field.name, v);
        }
      }}
      {...optionalArgs}
    />
  );
};

const CufField = ({
  cufField,
}: {
  cufField: ApiComponents["schemas"]["CustomUserFieldsData"];
}) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language as SupportedLanguages) || "it";
  // apl = available Placeholder Langs
  const apl = Object.keys(cufField.placeholder || {});
  let placeholder = "";
  if (!apl.includes(lang) && cufField.placeholder) {
    placeholder = cufField.placeholder.it || "";
  } else if (apl.includes(lang) && cufField.placeholder) {
    placeholder = cufField.placeholder[lang] || "";
  } else {
    placeholder = "";
  }
  return (
    <>
      <FormikField name={`cuf_${cufField.id}`}>
        {(fieldProps: FieldProps) => {
          const cufFieldLabel = cufField.name[
            i18n.language as SupportedLanguages
          ]
            ? cufField.name[i18n.language as SupportedLanguages]
            : cufField.name.it || "";
          return (
            <FormGroup>
              {cufField.type === "text" ? (
                <CufTextField
                  placeholder={placeholder}
                  fieldProps={fieldProps}
                  label={cufFieldLabel || ""}
                />
              ) : cufField.type === "select" ? (
                <CufSelectField
                  fieldProps={fieldProps}
                  label={cufFieldLabel || ""}
                  options={cufField.options || []}
                  id={cufField.id}
                  allowOther={cufField.allow_other}
                />
              ) : cufField.type === "multiselect" ? (
                <CufMultiSelectField
                  label={cufFieldLabel || ""}
                  fieldProps={fieldProps}
                  options={cufField.options || []}
                  id={cufField.id}
                  allowOther={cufField.allow_other}
                />
              ) : null}
              <ErrorMessage name={fieldProps.field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
    </>
  );
};
export default CufField;
