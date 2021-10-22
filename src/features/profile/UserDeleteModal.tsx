import UserStore from "../../redux/user";
import { Modal } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import {
  Text,
  Checkbox,
  BSGrid,
  BSCol,
  Button,
} from "@appquality/appquality-design-system";
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
        <BSGrid>
          <BSCol size="col-lg-6"></BSCol>
          <BSCol size="col-12 col-lg-6">
            <BSGrid>
              <BSCol size="col-6">
                <Button
                  type="primary"
                  flat
                  size="block"
                  onClick={() => {
                    closeDeleteModal();
                    updateDeletionReason("");
                  }}
                >
                  {t("Back")}
                </Button>
              </BSCol>
              <BSCol size="col-6">
                <Button
                  disabled={!deletionReason || !deletionReason.length}
                  type="danger"
                  flat
                  size="block"
                  onClick={() => deleteUser()}
                >
                  {t("Delete account")}
                </Button>
              </BSCol>
            </BSGrid>
          </BSCol>
        </BSGrid>
      }
      onClose={() => closeDeleteModal()}
    >
      <div>
        <Text>
          <Trans
            i18nKey="<bold>We are so very sorry that you are leaving us.</bold><br></br>Before you go, help us understand why you are leaving us and how we can improve."
            defaults="<bold>We are so very sorry that you are leaving us.</bold><br></br>Before you go, help us understand why you are leaving us and how we can improve."
            components={{ br: <br />, bold: <strong /> }}
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
            components={{ br: <br />, bold: <strong /> }}
          />
        </Text>
      </div>
    </Modal>
  );
};

export default GenericModal;
