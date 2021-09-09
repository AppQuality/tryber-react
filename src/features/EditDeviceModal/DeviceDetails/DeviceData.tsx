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
    const options: SelectType.Option[] = manufacturer.items.map(
      (m: ManufacturerItem) => {
        return { label: m, value: m };
      }
    );
    return (
      <div style={{ height: " 200px" }}>
        <Select
          name="manufacturer"
          label="Manufacturer"
          options={options}
          isClearable={false}
          onChange={(o) => o.value && selectManufacturer(o.value)}
          isLoading={manufacturer.loading}
          isDisabled={disabled || manufacturer.loading}
          value={{
            label: manufacturer.current || "",
            value: manufacturer.current || "",
          }}
        ></Select>
      </div>
    );
  }
  return null;
};
