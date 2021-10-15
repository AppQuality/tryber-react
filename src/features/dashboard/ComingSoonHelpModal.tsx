import {
  Modal,
  ModalBody,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import DashboardHelpStore from "../../redux/dashboardHelpModal";
import { useTranslation } from "react-i18next";

const ComingSoonHelpModal = ({}: {}) => {
  const { t } = useTranslation();
  const { isOpen, close } = DashboardHelpStore();
  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size="small"
      title={t("The manual is coming soon!")}
    >
      <ModalBody>
        <Title className="aq-mb-2" size="xs">
          {t("Great job!")}
        </Title>
        <Text>
          {t(
            "You have been selected for this campaign. The manual is coming soon, once ready you will find it here."
          )}
        </Text>
      </ModalBody>
    </Modal>
  );
};
export default ComingSoonHelpModal;
