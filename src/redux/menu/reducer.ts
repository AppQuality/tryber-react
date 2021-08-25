import * as actionTypes from "./actionTypes";

const initialState: MenuState = {
  open: false,
};

const reducer = (
  state: MenuState = initialState,
  action: MenuAction
): MenuState => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return {
        ...state,
        open: true,
      };
    case actionTypes.MENU_CLOSE:
      return {
        ...state,
        open: false,
      };
    case actionTypes.MENU_TOGGLE:
      return {
        ...state,
        open: !state.open,
      };
  }
  return state;
};

export default reducer;
