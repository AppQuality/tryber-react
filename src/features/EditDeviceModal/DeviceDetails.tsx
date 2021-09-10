import DeviceData from "./DeviceDetails/DeviceData";
import userDeviceStore from "../../redux/userDevices";
import { useFormikContext } from "formik";

export default ({ edit }: { edit: boolean }) => {
  const { current } = userDeviceStore();
  if (current) {
    return <DeviceData disabled={edit} current={current} />;
  }
  const { values } = useFormikContext();
  return <div>{JSON.stringify(values)}</div>;
};
