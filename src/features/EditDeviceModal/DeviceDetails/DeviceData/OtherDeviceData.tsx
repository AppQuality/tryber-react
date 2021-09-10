import { useFormikContext, Field } from "formik";
import deviceStore from "../../../../redux/devices";
import { Select, SelectType } from "@appquality/appquality-design-system";

const OtherDeviceData = () => {
  const { values } = useFormikContext<DeviceFormInterface>();
  const { devices } = deviceStore();
  if (!devices || devices.loading) return null;
  const manufacturer = devices.items.map((d: any) => {
    return { label: d.manufacturer, value: d.manufacturer };
  });
  let models: SelectType.Option[] = [];
  if (values.manufacturer) {
    models = devices.items
      .find((d: any) => d.manufacturer == values.manufacturer)
      .models.map((m: any) => {
        return { label: m.model, value: m.id.toString() };
      });
  }
  return (
    <>
      <Field name="manufacturer">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: any) => {
          return (
            <Select
              label="manufacturer"
              name="manufacturer"
              value={{
                label: values.manufacturer || "",
                value: values.manufacturer || "",
              }}
              options={manufacturer}
              onChange={(v) => {
                if (v == null) {
                  v = { label: "", value: "" };
                }
                field.onChange(v.value);
                form.setFieldValue("manufacturer", v.value, true);
              }}
            />
          );
        }}
      </Field>

      <Field name="model">
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: any) => {
          return (
            <Select
              label="model"
              name="model"
              value={{
                label: values.model || "",
                value: values.device.toString() || "0",
              }}
              options={models}
              onChange={(v) => {
                if (v == null) {
                  v = { label: "", value: "" };
                }
                field.onChange(v.value);
                form.setFieldValue("model", v.value, true);
                form.setFieldValue("device", v.value, true);
              }}
            />
          );
        }}
      </Field>
    </>
  );
};
export default OtherDeviceData;
