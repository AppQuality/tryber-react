import * as actionTypes from "./actionTypes";

export const fetchManufacturers = () => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.MANUFACTURER_LOAD });

    setTimeout(() => {
      const manufacturers = ["Samsung", "manufacturer2", "manufacturer3"];
      dispatch({ type: actionTypes.MANUFACTURER_FETCH, data: manufacturers });
    }, 1000);
  };
};

export const selectManufacturer = (manufacturer: string) => {
  return (dispatch: DeviceDispatchType) => {
    dispatch({ type: actionTypes.MANUFACTURER_SELECT, data: manufacturer });
  };
};
