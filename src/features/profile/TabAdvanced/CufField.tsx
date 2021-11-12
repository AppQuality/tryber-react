import {
  Input,
  FieldProps,
  FormikField,
  FormLabel,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CufTextField = ({
  fieldProps,
  label,
}: {
  fieldProps: FieldProps;
  label: string;
}) => {
  const { field } = fieldProps;
  return (
    <>
      <FormLabel htmlFor={field.name} label={label} />
      <Input id={field.name} type="text" value={field.value} />
    </>
  );
};
const CufSelectField = ({
  fieldProps,
  options,
  label,
  id,
}: {
  fieldProps: FieldProps;
  options: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
  label: string;
  id: number;
}) => {
  const { field } = fieldProps;
  const [selectOptions, setOptions] = useState<SelectOptionType[]>([]);
  useEffect(() => {
    setOptions(
      options.map((o) => ({
        label: o.name,
        value: o.id.toString(),
        field_id: id,
      }))
    );
  }, [options]);

  return (
    <Select
      menuTargetQuery={"body"}
      name={field.name}
      options={selectOptions}
      label={label}
      value={field.value}
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
}) => {
  const { field, form } = fieldProps;
  const [selectOptions, setOptions] = useState<SelectOptionType[]>([]);
  useEffect(() => {
    setOptions(
      options.map((o) => ({
        label: o.name,
        value: o.id.toString(),
        field_id: id,
      }))
    );
  }, [options]);
  return (
    <Select
      isMulti={true}
      menuTargetQuery={"body"}
      name={field.name}
      options={selectOptions}
      label={label}
      value={field.value}
      onChange={(v) => {
        if (!v) {
          form.setFieldValue(field.name, { label: "", value: "" });
        } else {
          form.setFieldValue(field.name, v);
        }
      }}
    />
  );
};

const CufField = ({
  cufField,
}: {
  cufField: ApiComponents["schemas"]["CustomUserFieldsData"];
}) => {
  const { i18n } = useTranslation();
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
                  fieldProps={fieldProps}
                  label={cufFieldLabel || ""}
                />
              ) : cufField.type === "select" ? (
                <CufSelectField
                  fieldProps={fieldProps}
                  label={cufFieldLabel || ""}
                  options={cufField.options || []}
                  id={cufField.id}
                />
              ) : cufField.type === "multiselect" ? (
                <CufMultiSelectField
                  label={cufFieldLabel || ""}
                  fieldProps={fieldProps}
                  options={cufField.options || []}
                  id={cufField.id}
                />
              ) : null}
            </FormGroup>
          );
        }}
      </FormikField>
    </>
  );
};
export default CufField;
