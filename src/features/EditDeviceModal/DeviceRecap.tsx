import { Select } from "@appquality/appquality-design-system";
import userDeviceStore from "../../redux/userDevices";

export default () => {
  const { current } = userDeviceStore();
  return <>{JSON.stringify(current)}</>;
};
