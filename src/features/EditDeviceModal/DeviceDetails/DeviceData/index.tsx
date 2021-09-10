import { Select, SelectType } from "@appquality/appquality-design-system";
import deviceStore from "../../../../redux/devices";
import userDeviceStore from "../../../../redux/userDevices";
import OtherDeviceData from "./OtherDeviceData";
import PCData from "./PCData";
import { useEffect } from "react";

export default ({ disabled, current }: { disabled: boolean; current: any }) => {
  const { devices } = deviceStore();
  if (!devices) return null;
  const { fetch: fetchManufacturer, select: selectManufacturer } = devices;

  let models: SelectType.Option[] = [];
  useEffect(() => {
    fetchManufacturer();
    if ("manufacturer" in current.device) {
      selectManufacturer(current.device.manufacturer);
    }
  }, []);
  useEffect(() => {
    if ("manufacturer" in current.device) {
      const currentManufacturer = devices.items.find(
        (m: ManufacturerDeviceItem) =>
          m.manufacturer === current.device.manufacturer
      );
      if (currentManufacturer) {
        models = currentManufacturer.models.map((mod: any) => {
          return { label: mod.model, value: mod.id };
        });
      }
    }
  }, [current]);

  if (current.type === "PC" && "pc_type" in current.device) {
    return <PCData />;
  } else if ("manufacturer" in current.device && "model" in current.device) {
    return <OtherDeviceData />;
  }
  return null;
};
