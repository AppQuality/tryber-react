import { Button, Modal, ModalBody } from "@appquality/appquality-design-system";
import { Headset } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import styled from "styled-components";

export const FeedbackModal = ({
  open = true,
  onClose,
}: {
  open?: boolean;
  onClose: () => void;
}) => {
  const { data: user, isLoading } = useGetUsersMeQuery({ fields: "id,email" });
  const { t } = useTranslation();

  const iFrameStyle = {
    height: "100%",
    width: "100%",
    minHeight: "400px",
    border: "none",
  };

  if (isLoading) return null;
  return (
    <Modal isOpen={open} onClose={onClose} title={t("Send us your feedback!")}>
      <ModalBody>
        <iframe
          title="Feedback form"
          src={`https://form.jotform.com/251940919244057?testerId=T${user?.id}&email=${user?.email}`}
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
        <Headset />
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
    line-height: 52px;
  }
`;
