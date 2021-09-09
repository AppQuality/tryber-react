import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  fetchDevices,
  selectDevice,
  openEditModal,
  openAddModal,
  closeEditModal,
  closeAddModal,
} from "./actionCreators";

export default (): DispatchSlice => {
  const {
    items,
    loading,
    error,
    editModalOpen,
    addModalOpen,
  }: UserDeviceState = useSelector(
    (state: GeneralState) => ({
      editModalOpen: state.userDevices.editModalOpen,
      addModalOpen: state.userDevices.addModalOpen,
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
    openEditModal: () => dispatch(openEditModal()),
    closeEditModal: () => dispatch(closeEditModal()),
    openAddModal: () => dispatch(openAddModal()),
    closeAddModal: () => dispatch(closeAddModal()),
    loading: loading,
    error: error,
    devices: items,
    current: currentDevice,
    editModalOpen: editModalOpen,
    addModalOpen: addModalOpen,
  };
};
