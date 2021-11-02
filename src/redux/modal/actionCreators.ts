import * as actionTypes from "./actionTypes";

export function openModal(
  content: React.ReactNode,
  footer?: React.ReactNode,
  title?: React.ReactNode
) {
  const action: ModalAction = {
    type: actionTypes.SET_MODAL,
    data: {
      content,
      footer,
      title,
    },
  };

  return (dispatch: ModalDispatchType) => dispatch(action);
}
export function closeModal() {
  const action: ModalAction = {
    type: actionTypes.UNSET_MODAL,
  };

  return (dispatch: ModalDispatchType) => dispatch(action);
}
