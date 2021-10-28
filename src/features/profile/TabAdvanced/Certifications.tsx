import { Radio, Button } from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import modalStore from "../../../redux/modal";
import { NewCertificationModal } from "./NewCertificationModal";

const Certifications = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<{ certifications: true }>();
  const { open } = modalStore();
  return (
    <>
      <Radio
        name="certifications"
        id="noCertifications"
        label={t("I have no certifications")}
      ></Radio>
      <Radio
        name="certifications"
        id="yesCertifications"
        label={t("I have the certifications")}
      ></Radio>
      {values.certifications && (
        <Button
          type="link"
          htmlType="button"
          flat
          style={{ padding: 0, fontWeight: 400 }}
          size="sm"
          onClick={() => {
            open({
              content: <NewCertificationModal />,
            });
          }}
        >
          {t("Add")}
        </Button>
      )}
    </>
  );
};
export default Certifications;
