import * as actionTypes from "./actionTypes";

export function openModal(
  content: React.ReactNode,
  footer?: React.ReactNode,
  title?: React.ReactNode,
  size?: "large" | "mid" | "small"
) {
  const action: ModalAction = {
    type: actionTypes.SET_MODAL,
    data: {
      content,
      footer,
      title,
      size,
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
