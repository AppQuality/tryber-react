import modalStore from "../redux/modal";
import { Modal } from "@appquality/appquality-design-system";

const GenericModal = () => {
  const { isOpen, close, content, footer, title } = modalStore();

  return (
    <Modal
      isOpen={isOpen}
      footer={footer}
      title={title}
      onClose={() => close()}
    >
      {content}
    </Modal>
  );
};

export default GenericModal;
