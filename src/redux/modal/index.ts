import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { openModal, closeModal } from "./actionCreators";

export default () => {
  const {
    open,
    content,
    footer,
    title,
    size,
  }: {
    open: boolean;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    title?: React.ReactNode;
    size?: "large" | "mid" | "small";
  } = useSelector(
    (state: GeneralState) => ({
      open: state.modal.open,
      content: state.modal.content,
      footer: state.modal.footer,
      title: state.modal.title,
      size: state.modal.size,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    isOpen: open,
    content: content,
    footer: footer,
    title: title,
    size: size,
    close: () => dispatch(closeModal()),
    open: ({
      content,
      footer,
      title,
      size,
    }: {
      content?: React.ReactNode;
      footer?: React.ReactNode;
      title?: React.ReactNode;
      size?: "large" | "mid" | "small";
    }) => dispatch(openModal(content, footer, title, size)),
  };
};
