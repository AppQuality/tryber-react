import * as actionTypes from "./actionTypes";
import API from "../../utils/api";

export const fetchManufacturers = () => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.MANUFACTURER_LOAD });

    return API.getModels({ deviceType: 0 })
      .then((data: any) => {
        dispatch({ type: actionTypes.MANUFACTURER_FETCH, data: data });
      })
      .catch((e: any) =>
        dispatch({ type: actionTypes.MANUFACTURER_FAILED, error: e })
      );
  };
};

export const selectManufacturer = (manufacturer: string) => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.MANUFACTURER_SELECT, data: manufacturer });
  };
};
