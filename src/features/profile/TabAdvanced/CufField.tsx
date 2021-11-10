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
  field,
  label,
}: {
  field: UserData["additional"][0];
  label: string;
}) => {
  return (
    <>
      <FormLabel htmlFor={field.name} label={label} />
      <Input id={field.name} type="text" value={field.value} />
    </>
  );
};
const CufSelectField = ({
  field,
  options,
  label,
}: {
  field: UserData["additional"][0];
  options: OptionsType;
  label: string;
}) => {
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
  field,
  options,
  label,
}: {
  field: UserData["additional"][0];
  options: OptionsType;
  label: string;
}) => {
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
    />
  );
};

const CufField = ({ cufField }: { cufField: UserData["additional"][0] }) => {
  const { i18n } = useTranslation();
  return (
    <>
      <FormikField name={`cuf_${cufField.id}`}>
        {({ field, form, meta }: FieldProps) => {
          const cufFieldLabel = cufField.name[i18n.language]
            ? cufField.name[i18n.language]
            : cufField.name.it || "";
          return (
            <FormGroup>
              {cufField.type === "text" ? (
                <CufTextField field={field} label={cufFieldLabel} />
              ) : cufField.type === "select" ? (
                <CufSelectField
                  field={field}
                  label={cufFieldLabel}
                  options={cufField.options}
                />
              ) : cufField.type === "multiselect" ? (
                <CufMultiSelectField
                  label={cufFieldLabel}
                  field={field}
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
