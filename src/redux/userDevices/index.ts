import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchDevices } from "./actionCreators";

export default (): DispatchSlice => {
  const { items, loading, error }: DeviceState = useSelector(
    (state: GeneralState) => ({
      items: state.userDevices.items,
      loading: state.userDevices.loading,
      error: state.userDevices.error,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    fetch: () => dispatch(fetchDevices()),
    loading: loading,
    error: error,
    devices: items,
  };
};
