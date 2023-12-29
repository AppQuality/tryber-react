import {
  Button,
  Checkbox,
  Modal,
  Text,
} from "@appquality/appquality-design-system";
import i18n from "i18next";
import { Trans, useTranslation } from "react-i18next";
import UserStore from "src/redux/user";
import styled from "styled-components";

const GenericModal = () => {
  const { deletion } = UserStore();
  const { t } = useTranslation();
  const {
    deleteUser,
    updateDeletionReason,
    deletionReason,
    isDeleteModalOpen,
    closeDeleteModal,
  } = deletion;

  const addRemoveDeletionReason = (reason: string, add: boolean) => {
    let reasons = deletionReason ? deletionReason.split(";") : [];
    if (add) {
      reasons.push(reason);
      reasons = reasons.filter((v, i, a) => a.indexOf(v) === i);
    } else {
      reasons = reasons.filter((r) => r != reason);
    }
    updateDeletionReason(reasons.join(";"));
  };
  return (
    <Modal
      isOpen={isDeleteModalOpen}
      footer={
        <UserDeleteModalFooter>
          <Button
            kind="primary"
            flat
            className="aq-mr-3"
            onClick={() => {
              closeDeleteModal();
              updateDeletionReason("");
            }}
          >
            {t("Back")}
          </Button>
          <Button
            disabled={!deletionReason || !deletionReason.length}
            kind="danger"
            flat
            onClick={() =>
              deleteUser(i18n.language === "en" ? "" : `${i18n.language}/`)
            }
          >
            {t("Delete account")}
          </Button>
        </UserDeleteModalFooter>
      }
      onClose={() => closeDeleteModal()}
    >
      <div>
        <Text>
          <Trans
            i18nKey="<bold>We are so very sorry that you are leaving us.</bold><br></br>Before you go, help us understand why you are leaving us and how we can improve."
            defaults="<bold>We are so very sorry that you are leaving us.</bold><br></br>Before you go, help us understand why you are leaving us and how we can improve."
            components={{
              br: <br />,
              bold: <strong className="aq-text-primary" />,
            }}
          />
        </Text>
        <Text className="aq-mt-3 aq-mb-3">
          {t("Why do you want to delete your account?")}
        </Text>
        <Checkbox
          className="aq-mb-3"
          label={t("I get too many emails")}
          value="TOO_MANY_EMAILS"
          onChange={(e) => {
            addRemoveDeletionReason(e.target.value, e.target.checked);
          }}
        />
        <Checkbox
          className="aq-mb-3"
          label={t("I don't receive testing campaigns")}
          value="NO_CAMPAIGNS"
          onChange={(e) => {
            addRemoveDeletionReason(e.target.value, e.target.checked);
          }}
        />
        <Checkbox
          className="aq-mb-3"
          label={t("I signed up by mistake")}
          value="SIGNUP_BY_MISTAKE"
          onChange={(e) => {
            addRemoveDeletionReason(e.target.value, e.target.checked);
          }}
        />
        <Checkbox
          className="aq-mb-3"
          label={t("I don’t have enough time to take part in the campaigns")}
          value="NO_TIME"
          onChange={(e) => {
            addRemoveDeletionReason(e.target.value, e.target.checked);
          }}
        />
        <Checkbox
          className="aq-mb-3"
          label={t(
            "Testing Campaigns are not clear and I'm not able to finished them"
          )}
          value="CAMPAIGNS_NOT_CLEAR"
          onChange={(e) => {
            addRemoveDeletionReason(e.target.value, e.target.checked);
          }}
        />
        <Checkbox
          className="aq-mb-3"
          label={t("Other")}
          value="OTHER"
          onChange={(e) => {
            addRemoveDeletionReason(e.target.value, e.target.checked);
          }}
        />
        <Text>
          <Trans
            i18nKey="<bold>This action is irreversible.</bold><br></br>Are you really sure you want to leave us?"
            defaults="<bold>This action is irreversible.</bold><br></br>Are you really sure you want to leave us?"
            components={{
              br: <br />,
              bold: <strong className="aq-text-primary" />,
            }}
          />
        </Text>
      </div>
    </Modal>
  );
};

export default GenericModal;

const UserDeleteModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    flex: 1 0 auto;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
      flex: 0 0 auto;
    }
  }
`;
