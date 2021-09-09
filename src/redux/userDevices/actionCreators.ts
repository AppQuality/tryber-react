import * as actionTypes from "./actionTypes";
import API from "../../utils/api";

export const fetchDevices = () => {
  return (dispatch: UserDeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_LOAD });

    API.myDevices({})
      .then((devices) => {
        if (devices.length) {
          devices[0].selected = true;
        }
        dispatch({ type: actionTypes.DEVICE_FETCH, data: devices });
      })
      .catch((e) => dispatch({ type: actionTypes.DEVICE_FAILED, error: e }));
  };
};

export const selectDevice = (id: number) => {
  return (dispatch: UserDeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_SELECT, data: id });
  };
};

export const openEditModal = () => {
  return (dispatch: UserDeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_EDIT_MODAL_OPEN });
  };
};
export const closeEditModal = () => {
  return (dispatch: UserDeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_EDIT_MODAL_CLOSE });
  };
};
export const openAddModal = () => {
  return (dispatch: UserDeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_ADD_MODAL_OPEN });
  };
};
export const closeAddModal = () => {
  return (dispatch: UserDeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_ADD_MODAL_CLOSE });
  };
};
