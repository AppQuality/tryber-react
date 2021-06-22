import { Modal } from "@appquality/appquality-design-system/dist/stories/modal/Modal";
import { useTranslation } from "react-i18next";
import {
  CSSGrid,
  Field,
  Form,
  SmallTitle,
} from "@appquality/appquality-design-system";
import { Button } from "@appquality/appquality-design-system";
import * as yup from "yup";

interface LoginMopdalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginMopdalProps) => {
  const { t } = useTranslation();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = {
    email: yup
      .string()
      .email(t("Email must be a valid email"))
      .required(t("This is a required field")),
    password: yup.string().required(t("This is a required field")),
  };
  return (
    <Modal
      className="login-modal"
      title={t("Login")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <CSSGrid min="50px"></CSSGrid>
    </Modal>
  );
};
