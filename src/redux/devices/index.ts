import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchManufacturers, selectManufacturer } from "./actionCreators";

export default (): DevicesDispatchSlice => {
  const { manufacturer }: DeviceState = useSelector(
    (state: GeneralState) => ({
      manufacturer: state.devices.manufacturer,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    manufacturer: {
      ...manufacturer,
      fetch: () => dispatch(fetchManufacturers()),
      select: (manufacturer: string) =>
        dispatch(selectManufacturer(manufacturer)),
    },
  };
};
