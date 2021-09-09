import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchDevices, selectDevice } from "./actionCreators";

export default (): DispatchSlice => {
  const { items, loading, error }: UserDeviceState = useSelector(
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
    select: (id: number) => dispatch(selectDevice(id)),
    loading: loading,
    error: error,
    devices: items,
  };
};
