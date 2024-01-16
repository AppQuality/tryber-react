import { Button, CSSGrid, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import modalStore from "src/redux/modal";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { useDeleteUsersMeCertificationsByCertificationIdMutation } from "src/services/tryberApi";
import { components } from "src/utils/schema";
import SingleCertification from "./SingleCertification";

export const DeleteCertificationsModal = ({
  certifications,
}: {
  certifications: components["schemas"]["Certification"][];
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {certifications.length > 1 ? (
        <Text>
          {t(
            "Do you want to remove all certification? This is an irreversible action."
          )}
        </Text>
      ) : (
        <div>
          <Text className="aq-mb-3">
            {t(
              "Do you want to remove this certification? This is a irreversible action."
            )}
          </Text>
          <SingleCertification certification={certifications[0]} />
        </div>
      )}
    </div>
  );
};

export const DeleteCertificationsModalFooter = ({
  certification,
  onClose,
}: {
  certification?: components["schemas"]["Certification"];
  onClose?: () => void;
}) => {
  const [deleteCertification] =
    useDeleteUsersMeCertificationsByCertificationIdMutation();
  const { close } = modalStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDeleteCertification = async () => {
    if (certification) {
      if (!certification.id) return;
      try {
        await deleteCertification({
          certificationId: certification.id,
        }).unwrap();
        dispatch(
          addMessage(t("Certification successfully removed"), "success")
        );
      } catch (e) {
        dispatch(
          addMessage(
            t("There was an error removing your certification"),
            "danger"
          )
        );
        return;
      }
    }
    close();
  };
  return (
    <CSSGrid min="40%">
      <Button
        kind="secondary"
        flat={true}
        onClick={() => {
          close();
          if (onClose) onClose();
        }}
      >
        {t("Keep")}
      </Button>
      <Button kind="danger" flat={true} onClick={handleDeleteCertification}>
        {t("Remove")}
      </Button>
    </CSSGrid>
  );
};
