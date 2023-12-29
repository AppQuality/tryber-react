import { Button, Modal, ModalBody } from "@appquality/appquality-design-system";
import { ChatLeftDots } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const FeedbackModal = ({
  open = true,
  onClose,
  user,
}: {
  open?: boolean;
  onClose: () => void;
  user?: UserData;
}) => {
  const { t } = useTranslation();

  const iFrameStyle = {
    height: "100%",
    width: "100%",
    minHeight: "400px",
    border: "none",
  };
  return (
    <Modal isOpen={open} onClose={onClose} title={t("Send us your feedback!")}>
      <ModalBody>
        <iframe
          src={`https://form.jotform.com/213364740407351?testerId=T${user?.id}&email=${user?.email}`}
          style={iFrameStyle}
        />
      </ModalBody>
    </Modal>
  );
};

export const FeedbackButton = ({
  handleClick,
}: {
  handleClick: () => void;
}) => {
  return (
    <StyledButton onClick={handleClick}>
      <Button kind="secondary" className="feedback-icon">
        <ChatLeftDots />
      </Button>
    </StyledButton>
  );
};

const StyledButton = styled.div`
  position: fixed;
  border: 0px;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  z-index: 999;
  transition: all 0.25s ease 0s;
  color: #ffffff;
  border-radius: 24px;
  padding: 0;
  max-width: 48px;
  height: 48px;
  bottom: 24px;
  right: 24px;
  .feedback-icon {
    padding: 0;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    font-size: 24px;
    transition: all 0.25s ease;
    width: 48px;
    height: 48px;
    line-height: 56px;
  }
`;
