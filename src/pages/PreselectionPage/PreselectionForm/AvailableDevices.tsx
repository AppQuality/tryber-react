import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
  Text,
} from "@appquality/appquality-design-system";

const options = [
  { label: "Device 1", value: "1" },
  { label: "Device 2", value: "2" },
];

export const AvailableDevices = () => {
  return (
    <FormikField name="device">
      {({ field, form }: FieldProps) => (
        <>
          <Select
            name={field.name}
            options={options}
            isClearable={false}
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
        </>
      )}
    </FormikField>
  );
};
