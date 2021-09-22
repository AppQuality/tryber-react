import { Modal, ModalBody } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export const FeedbackModal = ({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const iFrameStyle = {
    height: "100%",
    width: "100%",
    minHeight: "400px",
    border: "none",
  };
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalBody />
    </Modal>
  );
};
