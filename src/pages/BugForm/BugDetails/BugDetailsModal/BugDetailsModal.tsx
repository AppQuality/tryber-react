import { Modal, Text } from "@appquality/appquality-design-system";
import { Trans } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/store";
import { setBugDetailsModal } from "../../bugFormSlice";

export const BugDetailsModal = () => {
  const dispatch = useAppDispatch();

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
        return (
          <Trans
            i18nKey="available tags: <br>, <bold>:::BUGFORM_SEVERITY_MODAL_TXT"
            components={{
              br: <br />,
              bold: <strong className="aq-text-primary" />,
              b: <strong className="aq-text-primary" />,
            }}
          />
        );
      case "type":
        return (
          <Trans
            i18nKey="available tags: <br>, <bold>:::BUGFORM_TYPE_MODAL_TEXT"
            components={{
              br: <br />,
              bold: <strong className="aq-text-primary" />,
              b: <strong className="aq-text-primary" />,
            }}
          />
        );
      case "replicability":
        return (
          <Trans
            i18nKey="available tags: <br>, <bold>:::BUGFORM_REPLICABILTY_MODAL_TXT"
            components={{
              br: <br />,
              bold: <strong className="aq-text-primary" />,
              b: <strong className="aq-text-primary" />,
            }}
          />
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
