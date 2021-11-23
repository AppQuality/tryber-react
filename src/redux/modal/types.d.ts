type ModalAction = {
  type: string;
  data?: {
    content?: React.ReactNode;
    footer?: React.ReactNode;
    title?: React.ReactNode;
    size?: "large" | "mid" | "small";
  };
};

type ModalState = {
  open: boolean;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
  size?: "large" | "mid" | "small";
};
type ModalDispatchType = (args: ModalAction) => ModalAction;
