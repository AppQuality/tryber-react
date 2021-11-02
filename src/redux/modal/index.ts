import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { openModal, closeModal } from "./actionCreators";

export default () => {
  const {
    open,
    content,
    footer,
    title,
  }: {
    open: boolean;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    title?: React.ReactNode;
  } = useSelector(
    (state: GeneralState) => ({
      open: state.modal.open,
      content: state.modal.content,
      footer: state.modal.footer,
      title: state.modal.title,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    isOpen: open,
    content: content,
    footer: footer,
    title: title,
    close: () => dispatch(closeModal()),
    open: ({
      content,
      footer,
      title,
    }: {
      content?: React.ReactNode;
      footer?: React.ReactNode;
      title?: React.ReactNode;
    }) => dispatch(openModal(content, footer, title)),
  };
};
