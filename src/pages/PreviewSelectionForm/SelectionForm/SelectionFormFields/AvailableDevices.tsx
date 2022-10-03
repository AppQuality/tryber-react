import {
  ErrorMessage,
  FieldProps,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

const options = [
  { label: "Device 1", value: "1" },
  { label: "Device 2", value: "2" },
];

export const AvailableDevices = () => {
  const { t } = useTranslation();
  return (
    <Field
      name="device"
      validate={(value: Option[]) => {
        if (!value.length) {
          return t("This is a required field");
        }
      }}
    >
      {({ field, form }: FieldProps) => (
        <div className="aq-mb-3">
          <Select
            name={field.name}
            options={options}
            value={field.value}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v, true);
            }}
            label={"Devices"}
            placeholder={"Select device"}
            menuTargetQuery="body"
            noOptionsMessage={() => "No options"}
            isMulti
          />
          <ErrorMessage name={field.name} />
          <Text small>
            Do you have an acceptable device not listed here? Add it to your
            profile.
          </Text>
        </div>
      )}
    </Field>
  );
};
