import * as actionTypes from "./actionTypes";
import API from "../../utils/api";

export const fetchManufacturers = () => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICES_LOAD });

    return API.getModels({ deviceType: 0 })
      .then((data: any) => {
        dispatch({ type: actionTypes.DEVICES_FETCH, data: data });
      })
      .catch((e: any) =>
        dispatch({ type: actionTypes.DEVICES_FAILED, error: e })
      );
  };
};

export const selectManufacturer = (manufacturer: string) => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.DEVICES_SELECT, data: manufacturer });
  };
};
