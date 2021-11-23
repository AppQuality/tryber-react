import * as actionTypes from "./actionTypes";

const initialState: AddResidenceAddressModalState = {
  open: false,
};

const reducer = (
  state: AddResidenceAddressModalState = initialState,
  action: AddResidenceAddressModalAction
): DashboardHelpState => {
  switch (action.type) {
    case actionTypes.MODAL_OPEN:
      return {
        ...state,
        open: true,
      };
    case actionTypes.MODAL_CLOSE:
      return {
        ...state,
        open: false,
      };
    case actionTypes.MODAL_TOGGLE:
      return {
        ...state,
        open: !state.open,
      };
    case actionTypes.MODAL_UPDATE_DATA:
      return {
        ...state,
        ...action.data,
      };
  }
  return state;
};

export default reducer;
