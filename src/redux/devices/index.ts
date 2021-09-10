import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchManufacturers, selectManufacturer } from "./actionCreators";

export default (): DevicesDispatchSlice => {
  const { devices }: DeviceState = useSelector(
    (state: GeneralState) => ({
      devices: state.devices.devices,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    devices: {
      ...devices,
      fetch: () => dispatch(fetchManufacturers()),
      select: (manufacturer: string) =>
        dispatch(selectManufacturer(manufacturer)),
    },
  };
};
