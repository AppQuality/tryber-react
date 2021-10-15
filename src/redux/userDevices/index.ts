import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  fetchDevices,
  selectDevice,
  openEditModal,
  openAddModal,
  closeDeleteModal,
  openDeleteModal,
  closeEditModal,
  closeAddModal,
} from "./actionCreators";

const UserDevicesStore = (): DispatchSlice => {
  const {
    items,
    loading,
    error,
    editModalOpen,
    addModalOpen,
    deleteModalOpen,
  }: UserDeviceState = useSelector(
    (state: GeneralState) => ({
      editModalOpen: state.userDevices.editModalOpen,
      addModalOpen: state.userDevices.addModalOpen,
      deleteModalOpen: state.userDevices.deleteModalOpen,
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
    openDeleteModal: () => dispatch(openDeleteModal()),
    closeDeleteModal: () => dispatch(closeDeleteModal()),
    loading: loading,
    error: error,
    devices: items,
    current: currentDevice,
    editModalOpen: editModalOpen,
    addModalOpen: addModalOpen,
    deleteModalOpen: deleteModalOpen,
  };
};

export default UserDevicesStore;
