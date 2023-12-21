import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const Step1 = () => {
  const { t } = useTranslation();
  return <div data-qa="mail-signup-second-step">secondo step</div>;
};

export default Step1;
