import { Button, CSSGrid, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import React from "react";
import { components } from "src/utils/schema";
import modalStore from "src/redux/modal";
import { deleteCertification } from "src/redux/user/actions/deleteCertification";
import { useDispatch } from "react-redux";
import { addCertification } from "src/redux/user/actions/addCertification";

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
          <Text small className="aq-text-disabled-dark">
            {certifications[0].achievement_date}
          </Text>
          <Text>
            {t("Institute:")} <strong>{certifications[0].institute}</strong>
          </Text>
          <strong>{certifications[0].name}</strong>
          <strong>{certifications[0].area}</strong>
        </div>
      )}
    </div>
  );
};

export const DeleteCertificationsModalFooter = ({
  certification,
  onSubmit,
  onClose,
}: {
  certification?: components["schemas"]["Certification"];
  onSubmit?: () => void;
  onClose?: () => void;
}) => {
  const { close } = modalStore();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDeleteCertification = () => {
    if (certification) {
      if (!certification.id) return;
      dispatch(
        deleteCertification(
          certification.id,
          t("Certification successfully removed"),
          t("There was an error removing your certification")
        )
      );
    } else {
      dispatch(
        addCertification(
          { certifications: false },
          t("All your certifications were successfully removed"),
          t("There was an error removing your certifications")
        )
      );
      if (onSubmit) onSubmit();
    }
    close();
  };
  return (
    <CSSGrid min="40%">
      <Button
        type="secondary"
        flat={true}
        onClick={() => {
          close();
          if (onClose) onClose();
        }}
      >
        {t("Keep")}
      </Button>
      <Button type="danger" flat={true} onClick={handleDeleteCertification}>
        {t("Remove")}
      </Button>
    </CSSGrid>
  );
};
