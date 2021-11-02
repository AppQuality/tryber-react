type ModalAction = {
  type: string;
  data?: {
    content?: React.ReactNode;
    footer?: React.ReactNode;
    title?: React.ReactNode;
  };
};

type ModalState = {
  open: boolean;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
};
type ModalDispatchType = (args: ModalAction) => ModalAction;
