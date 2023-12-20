import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const Step2 = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {
  const { t } = useTranslation();
  return <div data-qa="mail-signup-second-step">secondo step</div>;
};

export default Step2;
