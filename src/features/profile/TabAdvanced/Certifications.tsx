import { Radio } from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";

const Certifications = () => {
  const { t } = useTranslation();
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
    </>
  );
};
export default Certifications;
