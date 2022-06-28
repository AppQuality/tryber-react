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
        return t("BUGFORM_SEVERITY_MODAL_TXT", {
          defaultValue: (
            <>
              <strong>Low</strong>
              <div className="aq-mb-3">
                Issues related to unresponsive and/or crashing software. When
                the user needs to reset or relaunch it to keep using it (i.e.
                apps closing unexpectedly, neverending loadings, 404 error
                pages,...).
              </div>
              <strong>Medium</strong>
              <div className="aq-mb-3">
                Issues related to the visual aspect of the product, such as
                overlapping elements, wrong contrast, incoherent elements, cut
                or blurry text or media, elements that are either out of the
                screen or partially not visible/overlapped.
              </div>
              <strong>Hight</strong>
              <div className="aq-mb-3">
                Issues strictly related to the contents load speed or the
                completion time processes/actions (lag, slowing down, delays).
                In the case of a never-ending loading, the correct bug type is
                CRASH.
              </div>
              <strong>Critical</strong>
              <div>
                Issues related to a wrong functioning or non functioning feature
                of the product. When the feature works, but the result is
                different than what the user would expect, the bug type is
                USABILITY.
              </div>
            </>
          ),
        });
      case "type":
        return t("BUGFORM_TYPE_MODAL_TEXT", {
          defaultValue: (
            <>
              <strong>Crash</strong>
              <div className="aq-mb-3">
                Issues related to unresponsive and/or crashing software. When
                the user needs to reset or relaunch it to keep using it (i.e.
                apps closing unexpectedly, neverending loadings, 404 error
                pages,...).
              </div>
              <strong>Graphic</strong>
              <div className="aq-mb-3">
                Issues related to the visual aspect of the product, such as
                overlapping elements, wrong contrast, incoherent elements, cut
                or blurry text or media, elements that are either out of the
                screen or partially not visible/overlapped.
              </div>
              <strong>Performance</strong>
              <div className="aq-mb-3">
                Issues strictly related to the contents load speed or the
                completion time processes/actions (lag, slowing down, delays).
                In the case of a never-ending loading, the correct bug type is
                CRASH.
              </div>
              <strong>Malfunction</strong>
              <div>
                Issues related to a wrong functioning or non functioning feature
                of the product. When the feature works, but the result is
                different than what the user would expect, the bug type is
                USABILITY.
              </div>
            </>
          ),
        });
      case "replicability":
        return t("BUGFORM_REPLICABILTY_MODAL_TXT", {
          defaultValue: (
            <>
              <strong>Sometimes</strong>
              <div className="aq-mb-3">
                Issues related to unresponsive and/or crashing software. When
                the user needs to reset or relaunch it to keep using it (i.e.
                apps closing unexpectedly, neverending loadings, 404 error
                pages,...).
              </div>
              <strong>Always</strong>
              <div className="aq-mb-3">
                Issues related to the visual aspect of the product, such as
                overlapping elements, wrong contrast, incoherent elements, cut
                or blurry text or media, elements that are either out of the
                screen or partially not visible/overlapped.
              </div>
              <strong>Once</strong>
              <div className="aq-mb-3">
                Issues strictly related to the contents load speed or the
                completion time processes/actions (lag, slowing down, delays).
                In the case of a never-ending loading, the correct bug type is
                CRASH.
              </div>
            </>
          ),
        });
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
