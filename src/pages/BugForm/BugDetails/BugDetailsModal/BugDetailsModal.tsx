import { Modal, Text } from "@appquality/appquality-design-system";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../redux/provider";

export const BugDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { open, title, type } = useSelector(
    (state: GeneralState) => state.bugForm.bugDetailsModal,
    shallowEqual
  );

  const onClose = () =>
    dispatch({
      type: "bugForm/setBugDetailsModal",
      payload: {
        open: false,
        title: "",
        type: "",
      },
    });

  const getContent = () => {
    switch (type) {
      case "severity":
        return (
          <>
            <strong>Crash</strong>
            <div className="aq-mb-3">
              Issues related to unresponsive and/or crashing software. When the
              user needs to reset or relaunch it to keep using it (i.e. apps
              closing unexpectedly, neverending loadings, 404 error pages,...).
            </div>
            <strong>Graphic</strong>
            <div className="aq-mb-3">
              Issues related to the visual aspect of the product, such as
              overlapping elements, wrong contrast, incoherent elements, cut or
              blurry text or media, elements that are either out of the screen
              or partially not visible/overlapped.
            </div>
            <strong>Performance</strong>
            <div className="aq-mb-3">
              Issues strictly related to the contents load speed or the
              completion time processes/actions (lag, slowing down, delays). In
              the case of a never-ending loading, the correct bug type is CRASH.
            </div>
            <strong>Malfunction</strong>
            <div>
              Issues related to a wrong functioning or non functioning feature
              of the product. When the feature works, but the result is
              different than what the user would expect, the bug type is
              USABILITY.
            </div>
          </>
        );
      case "type":
        return (
          <>
            <strong>Crash</strong>
            <div className="aq-mb-3">
              Issues related to unresponsive and/or crashing software. When the
              user needs to reset or relaunch it to keep using it (i.e. apps
              closing unexpectedly, neverending loadings, 404 error pages,...).
            </div>
            <strong>Graphic</strong>
            <div className="aq-mb-3">
              Issues related to the visual aspect of the product, such as
              overlapping elements, wrong contrast, incoherent elements, cut or
              blurry text or media, elements that are either out of the screen
              or partially not visible/overlapped.
            </div>
            <strong>Performance</strong>
            <div className="aq-mb-3">
              Issues strictly related to the contents load speed or the
              completion time processes/actions (lag, slowing down, delays). In
              the case of a never-ending loading, the correct bug type is CRASH.
            </div>
            <strong>Malfunction</strong>
            <div>
              Issues related to a wrong functioning or non functioning feature
              of the product. When the feature works, but the result is
              different than what the user would expect, the bug type is
              USABILITY.
            </div>
          </>
        );
      case "replicability":
        return (
          <>
            <strong>Crash</strong>
            <div className="aq-mb-3">
              Issues related to unresponsive and/or crashing software. When the
              user needs to reset or relaunch it to keep using it (i.e. apps
              closing unexpectedly, neverending loadings, 404 error pages,...).
            </div>
            <strong>Graphic</strong>
            <div className="aq-mb-3">
              Issues related to the visual aspect of the product, such as
              overlapping elements, wrong contrast, incoherent elements, cut or
              blurry text or media, elements that are either out of the screen
              or partially not visible/overlapped.
            </div>
            <strong>Performance</strong>
            <div className="aq-mb-3">
              Issues strictly related to the contents load speed or the
              completion time processes/actions (lag, slowing down, delays). In
              the case of a never-ending loading, the correct bug type is CRASH.
            </div>
            <strong>Malfunction</strong>
            <div>
              Issues related to a wrong functioning or non functioning feature
              of the product. When the feature works, but the result is
              different than what the user would expect, the bug type is
              USABILITY.
            </div>
          </>
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
