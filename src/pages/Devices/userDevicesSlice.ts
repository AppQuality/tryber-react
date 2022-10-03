import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDevice } from "src/services/tryberApi";

interface UserDevicesSliceState {
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  isDeleteModalOpen: boolean;
  current?: UserDevice;
}

const initialState: UserDevicesSliceState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
};

const userDevicesSlice = createSlice({
  name: "userDevices",
  initialState: initialState,
  reducers: {
    selectDevice(state, action: PayloadAction<UserDevice>) {
      state.current = action.payload;
    },
    openEditDeviceModal(state) {
      state.isEditModalOpen = true;
    },
    closeEditDeviceModal(state) {
      state.isEditModalOpen = false;
    },
    openDeleteDeviceModal(state) {
      state.isDeleteModalOpen = true;
    },
    closeDeleteDeviceModal(state) {
      state.isDeleteModalOpen = false;
    },
    openAddDeviceModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddDeviceModal(state) {
      state.isAddModalOpen = false;
    },
  },
});

const { actions, reducer } = userDevicesSlice;

export const {
  selectDevice,
  openAddDeviceModal,
  closeAddDeviceModal,
  openDeleteDeviceModal,
  closeDeleteDeviceModal,
  openEditDeviceModal,
  closeEditDeviceModal,
} = actions;
export default reducer;
