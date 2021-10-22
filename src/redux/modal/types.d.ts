type ModalAction = {
  type: string;
  data?: {
    content?: React.ReactNode;
    footer?: React.ReactNode;
  };
};

type ModalState = {
  open: boolean;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};
type ModalDispatchType = (args: ModalAction) => ModalAction;
