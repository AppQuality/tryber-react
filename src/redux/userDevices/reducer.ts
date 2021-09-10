import * as actionTypes from "./actionTypes";

const initialState: UserDeviceState = {
  loading: true,
  editModalOpen: false,
  addModalOpen: false,
};

const reducer = (
  state: UserDeviceState = initialState,
  action: UserDeviceAction
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
    case actionTypes.DEVICE_UNSELECT:
      return {
        ...state,
        items: state.items.map((i: DeviceItem) => {
          i.selected = false;
          return i;
        }),
      };
    case actionTypes.DEVICE_LOAD:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case actionTypes.DEVICE_EDIT_MODAL_OPEN:
      return {
        ...state,
        editModalOpen: true,
      };
    case actionTypes.DEVICE_EDIT_MODAL_CLOSE:
      return {
        ...state,
        editModalOpen: false,
      };
    case actionTypes.DEVICE_ADD_MODAL_OPEN:
      return {
        ...state,
        addModalOpen: true,
      };
    case actionTypes.DEVICE_ADD_MODAL_CLOSE:
      return {
        ...state,
        addModalOpen: false,
      };
  }
  return state;
};

export default reducer;
