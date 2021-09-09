import * as actionTypes from "./actionTypes";

const initialState: DeviceState = {
  manufacturer: { items: [], loading: true },
};

const reducer = (
  state: DeviceState = initialState,
  action: DeviceAction
): DeviceState => {
  switch (action.type) {
    case actionTypes.MANUFACTURER_LOAD:
      return {
        ...state,
        manufacturer: { ...state.manufacturer, loading: true },
      };
    case actionTypes.MANUFACTURER_FETCH:
      return {
        ...state,
        manufacturer: {
          ...state.manufacturer,
          items: action.data,
          loading: false,
        },
      };
    case actionTypes.MANUFACTURER_SELECT:
      return {
        ...state,
        manufacturer: {
          ...state.manufacturer,
          current: action.data,
        },
      };
  }
  return state;
};

export default reducer;
