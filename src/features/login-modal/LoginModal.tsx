import { Modal } from "@appquality/appquality-design-system/dist/stories/modal/Modal";
import { StyledLoginModal } from "./_style";
import { useTranslation } from "react-i18next";
import {
  CSSGrid,
  Field,
  Form,
  FormGroup,
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
    <StyledLoginModal>
      <Modal title={t("Login")} isOpen={isOpen} onClose={onClose}>
        <div className="modal-login-form">
          <div style={{ gridColumn: "auto / span 3" }}>
            Accedi con le credenziali oppure crea un account
            <FormGroup>
              <label>{t("Email")}</label>
              <input type="email" />
              <label>{t("Password")}</label>
              <input type="password" />
              <a href="#">hai dimenticato la password</a>
              <Button type="success" disabled>
                {t("login")}
              </Button>
              Oppure accedi con
            </FormGroup>
          </div>
        </div>
      </Modal>
    </StyledLoginModal>
  );
};
