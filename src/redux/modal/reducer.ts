import * as actionTypes from "./actionTypes";

const initialState: ModalState = {
  open: false,
};

const reducer = (
  state: ModalState = initialState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return {
        ...state,
        open: true,
        content: action?.data?.content,
        footer: action?.data?.footer,
        title: action?.data?.title,
      };
    case actionTypes.UNSET_MODAL:
      return {
        ...state,
        open: false,
        content: undefined,
        footer: undefined,
        title: undefined,
      };
  }
  return state;
};

export default reducer;
