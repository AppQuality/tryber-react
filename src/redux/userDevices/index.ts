import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  fetchDevices,
  selectDevice,
  openModal,
  closeModal,
} from "./actionCreators";

export default (): DispatchSlice => {
  const { items, loading, error, modalOpen }: UserDeviceState = useSelector(
    (state: GeneralState) => ({
      modalOpen: state.userDevices.modalOpen,
      items: state.userDevices.items,
      loading: state.userDevices.loading,
      error: state.userDevices.error,
    }),
    shallowEqual
  );

  const currentDevice = items
    ? items.find((d: DeviceItem) => d.selected)
    : undefined;
  const dispatch: Dispatch<any> = useDispatch();

  return {
    fetch: () => dispatch(fetchDevices()),
    select: (id: number) => dispatch(selectDevice(id)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    loading: loading,
    error: error,
    devices: items,
    current: currentDevice,
    modalOpen: modalOpen,
  };
};
