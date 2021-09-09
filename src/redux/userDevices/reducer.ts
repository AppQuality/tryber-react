import * as actionTypes from "./actionTypes";

const initialState: UserDeviceState = {
  loading: true,
  modalOpen: false,
};

const reducer = (
  state: UserDeviceState = initialState,
  action: DeviceAction
): UserDeviceState => {
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
    case actionTypes.DEVICE_SELECT:
      return {
        ...state,
        items: state.items.map((i: DeviceItem) => {
          i.selected = i.id === action.data;
          return i;
        }),
      };
    case actionTypes.DEVICE_LOAD:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case actionTypes.DEVICE_MODAL_OPEN:
      return {
        ...state,
        modalOpen: true,
      };
    case actionTypes.DEVICE_MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false,
      };
  }
  return state;
};

export default reducer;
