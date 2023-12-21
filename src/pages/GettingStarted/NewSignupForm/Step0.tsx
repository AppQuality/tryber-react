import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const Step0 = () => {
  const { t } = useTranslation();
  return <div data-qa="mail-signup-first-step">primo step</div>;
};

export default Step0;
