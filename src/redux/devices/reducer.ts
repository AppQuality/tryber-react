import * as actionTypes from "./actionTypes";

const initialState: DeviceState = {
  devices: { items: [], loading: true },
};

const reducer = (
  state: DeviceState = initialState,
  action: DeviceAction
): DeviceState => {
  switch (action.type) {
    case actionTypes.DEVICES_LOAD:
      return {
        ...state,
        devices: { ...state.devices, loading: true },
      };
    case actionTypes.DEVICES_FETCH:
      return {
        ...state,
        devices: {
          ...state.devices,
          items: action.data,
          loading: false,
        },
      };
    case actionTypes.DEVICES_SELECT:
      return {
        ...state,
        devices: {
          ...state.devices,
          current: action.data,
        },
      };
  }
  return state;
};

export default reducer;
