import { useFormikContext, Field } from "formik";
import { Select, SelectType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import API from "../../../../utils/api";
import { operations } from "../../../../utils/schema";

const OtherDeviceData = ({ edit }: { edit: boolean }) => {
  const { values } = useFormikContext<DeviceFormInterface>();

  const [apiDevices, setApiDevices] = useState<
    operations["get-devices-devices-type-model"]["responses"]["200"]["content"]["application/json"]
  >([]);
  const [manufacturers, setManufacturers] = useState<SelectType.Option[]>([]);
  const [models, setModels] = useState<SelectType.Option[]>([]);
  useEffect(() => {
    const getModels = async () => {
      const res = await API.getModels({ deviceType: values.device_type });
      setApiDevices(res);
    };
    if (values.device_type !== 2) {
      // device type already selected and not a PC
      // fetch manufacturer and models
      getModels();
    }
  }, [values.device_type]);
  useEffect(() => {
    // fill manufacturers and models
    let manufacturersOptions: SelectType.Option[] = [];
    let modelsOptions: SelectType.Option[] = [];
    apiDevices.forEach((d) => {
      if (d.manufacturer) {
        manufacturersOptions.push({
          label: d.manufacturer || "",
          value: d.manufacturer || "",
        });
        if (values.manufacturer === d.manufacturer && d.models)
          modelsOptions = d.models.map((items) => {
            if (items.name && items.id) {
              return {
                label: items.name,
                value: items.id.toString(),
              };
            }
            return { label: "", value: "" };
          });
      }
    });
    setManufacturers(manufacturersOptions);
    setModels(modelsOptions);
  }, [values.manufacturer, apiDevices]);

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
              isDisabled={edit}
              value={{
                label: values.manufacturer || "",
                value: values.manufacturer || "",
              }}
              menuTargetQuery="body"
              options={manufacturers}
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
              isDisabled={edit}
              menuTargetQuery="body"
              value={{
                label: values.model || "",
                value: values.device?.toString() || "0",
              }}
              options={models}
              onChange={(v) => {
                if (v == null) {
                  v = { label: "", value: "" };
                }
                field.onChange(v.value);
                form.setFieldValue("model", v.label, true);
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
