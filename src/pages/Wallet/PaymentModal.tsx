import { Modal } from "@appquality/appquality-design-system";

export const PaymentModal = () => {
  const closeModal = () => {
    return;
  };
  return <Modal isOpen={false} onClose={closeModal} />;
};
