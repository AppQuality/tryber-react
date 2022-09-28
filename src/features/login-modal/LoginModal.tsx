import { Modal, ModalBody } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import LoginForm from "../LoginForm";
import { StyledLoginModal } from "./_style";
import { LoginMopdalProps } from "./_types";

export const LoginModal = ({ isOpen, onClose }: LoginMopdalProps) => {
  const { t } = useTranslation();
  return (
    <StyledLoginModal>
      <Modal title={t("Login")} isOpen={isOpen} onClose={onClose}>
        <ModalBody className="modal-body">
          <LoginForm
            className="modal-login-form"
            onRegisterLinkClick={onClose}
          />
        </ModalBody>
      </Modal>
    </StyledLoginModal>
  );
};
