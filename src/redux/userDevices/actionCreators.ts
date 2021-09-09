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
