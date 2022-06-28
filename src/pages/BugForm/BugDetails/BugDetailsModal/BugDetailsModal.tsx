import { Modal, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/store";
import { setBugDetailsModal } from "../../bugFormSlice";

export const BugDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { open, title, type } = useAppSelector(
    (state) => state.bugForm.bugDetailsModal
  );

  const onClose = () =>
    dispatch(
      setBugDetailsModal({
        open: false,
        title: "",
        type: "",
      })
    );

  const getContent = () => {
    switch (type) {
      case "severity":
        return t("available tags: <br>, <bold>:::BUGFORM_SEVERITY_MODAL_TXT");
      case "type":
        return t("available tags: <br>, <bold>:::BUGFORM_TYPE_MODAL_TEXT");
      case "replicability":
        return t(
          "available tags: <br>, <bold>:::BUGFORM_REPLICABILTY_MODAL_TXT"
        );
      default:
        return <></>;
    }
  };

  return (
    <Modal title={title} isOpen={open} onClose={onClose}>
      <Text className="aq-text-primary">{getContent()}</Text>
    </Modal>
  );
};
