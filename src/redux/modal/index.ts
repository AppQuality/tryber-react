import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { openModal, closeModal } from "./actionCreators";

export default () => {
  const {
    open,
    content,
    footer,
  }: { open: boolean; content?: React.ReactNode; footer?: React.ReactNode } =
    useSelector(
      (state: GeneralState) => ({
        open: state.modal.open,
        content: state.modal.content,
        footer: state.modal.footer,
      }),
      shallowEqual
    );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    isOpen: open,
    content: content,
    footer: footer,
    close: () => dispatch(closeModal()),
    open: ({
      content,
      footer,
    }: {
      content?: React.ReactNode;
      footer?: React.ReactNode;
    }) => dispatch(openModal(content, footer)),
  };
};
