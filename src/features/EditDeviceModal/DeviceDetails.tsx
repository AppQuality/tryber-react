import DeviceData from "./DeviceDetails/DeviceData";
import userDeviceStore from "../../redux/userDevices";

export default ({ edit }: { edit: boolean }) => {
  const { current } = userDeviceStore();
  if (!current) return null;
  return <DeviceData disabled={edit} current={current} />;
};
