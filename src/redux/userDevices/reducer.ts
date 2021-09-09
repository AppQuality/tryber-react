import * as actionTypes from "./actionTypes";

const initialState: DeviceState = {
  loading: true,
};

const reducer = (
  state: DeviceState = initialState,
  action: DeviceAction
): DeviceState => {
  switch (action.type) {
    case actionTypes.DEVICE_FETCH:
      if (action.data) {
        return {
          ...state,
          items: action.data,
          loading: false,
        };
      }
      return {
        ...state,
      };
    case actionTypes.DEVICE_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.DEVICE_LOAD:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
  }
  return state;
};

export default reducer;
