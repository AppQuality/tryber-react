import * as actionTypes from "./actionTypes";
import API from "../../utils/api";

export const fetchDevices = () => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICE_LOAD });

    API.myDevices({})
      .then((devices) => {
        dispatch({ type: actionTypes.DEVICE_FETCH, data: devices });
      })
      .catch((e) => dispatch({ type: actionTypes.DEVICE_FAILED, error: e }));
  };
};
