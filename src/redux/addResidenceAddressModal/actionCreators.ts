import * as actionTypes from "./actionTypes";

export function open() {
  const action: AddResidenceAddressModalAction = {
    type: actionTypes.MODAL_OPEN,
  };

  return (dispatch: AddResidenceAddressModalDispatchType) => dispatch(action);
}
export function close() {
  const action: AddResidenceAddressModalAction = {
    type: actionTypes.MODAL_CLOSE,
  };

  return (dispatch: AddResidenceAddressModalDispatchType) => dispatch(action);
}
export function toggle() {
  const action: AddResidenceAddressModalAction = {
    type: actionTypes.MODAL_TOGGLE,
  };

  return (dispatch: AddResidenceAddressModalDispatchType) => dispatch(action);
}

export function updateData(values: { street: string }) {
  const action: AddResidenceAddressModalAction = {
    type: actionTypes.MODAL_UPDATE_DATA,
    data: values,
  };

  return (dispatch: AddResidenceAddressModalDispatchType) => dispatch(action);
}
