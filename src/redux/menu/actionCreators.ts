import * as actionTypes from "./actionTypes";

export function openMenu() {
  const action: MenuAction = {
    type: actionTypes.MENU_OPEN,
  };

  return (dispatch: MenuDispatchType) => dispatch(action);
}
export function closeMenu() {
  const action: MenuAction = {
    type: actionTypes.MENU_CLOSE,
  };

  return (dispatch: MenuDispatchType) => dispatch(action);
}
export function toggleMenu() {
  const action: MenuAction = {
    type: actionTypes.MENU_TOGGLE,
  };

  return (dispatch: MenuDispatchType) => dispatch(action);
}
