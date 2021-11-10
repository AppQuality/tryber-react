import {
  Input,
  FieldProps,
  FormikField,
  FormLabel,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";

type OptionsType = {
  id: number;
  name: string;
}[];

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
}: {
  fieldProps: FieldProps;
  options: OptionsType;
  label: string;
}) => {
  const { field } = fieldProps;
  let value = "";
  const option = field?.value?.value
    ? options.find((o) => o.name === field.value.value)
    : false;
  if (option) {
    value = option.id.toString();
  }
  return (
    <Select
      menuTargetQuery={"body"}
      name={field.name}
      options={options.map((o) => ({ label: o.name, value: o.id.toString() }))}
      label={label}
      value={{ label: field?.value?.value || "", value: value }}
    />
  );
};
const CufMultiSelectField = ({
  fieldProps,
  options,
  label,
}: {
  fieldProps: FieldProps;
  options: OptionsType;
  label: string;
}) => {
  const { field, form } = fieldProps;
  let value: any = [];
  const option = field?.value
    ? options.filter((o) =>
        field.value.map((v: { value: string }) => v.value).includes(o.name)
      )
    : false;
  if (option) {
    value = option.map((o) => ({ label: "suca", value: o.id.toString() }));
  }
  return (
    <Select
      isMulti={true}
      menuTargetQuery={"body"}
      name={field.name}
      options={options.map((o) => ({ label: o.name, value: o.id.toString() }))}
      label={label}
      value={value}
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

const CufField = ({ cufField }: { cufField: UserData["additional"][0] }) => {
  const { i18n } = useTranslation();
  return (
    <>
      <FormikField name={`cuf_${cufField.id}`}>
        {(fieldProps: FieldProps) => {
          const cufFieldLabel = cufField.name[i18n.language]
            ? cufField.name[i18n.language]
            : cufField.name.it || "";
          return (
            <FormGroup>
              {cufField.type === "text" ? (
                <CufTextField fieldProps={fieldProps} label={cufFieldLabel} />
              ) : cufField.type === "select" ? (
                <CufSelectField
                  fieldProps={fieldProps}
                  label={cufFieldLabel}
                  options={cufField.options}
                />
              ) : cufField.type === "multiselect" ? (
                <CufMultiSelectField
                  label={cufFieldLabel}
                  fieldProps={fieldProps}
                  options={cufField.options}
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
