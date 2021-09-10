import { Select, SelectType } from "@appquality/appquality-design-system";
import deviceStore from "../../../redux/devices";
import userDeviceStore from "../../../redux/userDevices";
import { useEffect } from "react";

export default ({ disabled, current }: { disabled: boolean; current: any }) => {
  const { manufacturer } = deviceStore();
  if (!manufacturer) return null;
  const { fetch: fetchManufacturer, select: selectManufacturer } = manufacturer;

  useEffect(() => {
    fetchManufacturer();
    if ("manufacturer" in current.device)
      selectManufacturer(current.device.manufacturer);
  }, []);

  if (current.type === "PC" && "pc_type" in current.device) {
    return <>PC</>;
  } else if ("manufacturer" in current.device && "model" in current.device) {
    let models: SelectType.Option[] = [];
    const manufacturers: SelectType.Option[] = manufacturer.items.map(
      (m: ManufacturerDeviceItem) => {
        if (
          current.device &&
          "manufacturer" in current.device &&
          current.device.manufacturer === m.manufacturer
        ) {
          models = m.models.map((mod: any) => {
            return { label: mod.model, value: mod.id };
          });
        }
        return { label: m.manufacturer, value: m.manufacturer };
      }
    );
    return (
      <div style={{ height: " 200px" }}>
        <Select
          name="manufacturer"
          label="Manufacturer"
          options={manufacturers}
          isClearable={false}
          onChange={(o) => o.value && selectManufacturer(o.value)}
          isLoading={manufacturer.loading}
          isDisabled={disabled || manufacturer.loading}
          value={{
            label: manufacturer.current || "",
            value: manufacturer.current || "",
          }}
        ></Select>
        <Select
          name="model"
          label="Model"
          options={models}
          isClearable={false}
          onChange={(o) => o.value && selectManufacturer(o.value)}
          isLoading={manufacturer.loading}
          isDisabled={disabled || !models.length}
          value={{
            label: "",
            value: "",
          }}
        ></Select>
      </div>
    );
  }
  return null;
};
