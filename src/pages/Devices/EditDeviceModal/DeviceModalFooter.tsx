import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/store";

interface ModalFooterProps {
  isValid: boolean;
  steps: WizardStep[];
  setStep: (n: number) => void;
  currentStep: number;
  onSubmit: () => void;
}

export const DeviceModalFooter = ({
  isValid,
  steps,
  setStep,
  currentStep,
  onSubmit,
}: ModalFooterProps) => {
  const { t } = useTranslation();
  const { current } = useAppSelector((state) => state.userDevices);
  return (
    <div className="device-wizard-footer">
      {currentStep > 0 && (
        <Button
          type="primary"
          flat={true}
          onClick={() => setStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          {t("Back")}
        </Button>
      )}
      {currentStep === steps.length - 1 ? (
        <Button
          type="primary"
          htmlType="submit"
          onClick={onSubmit}
          flat={true}
          disabled={currentStep > steps.length - 1}
        >
          {current ? t("Save changes") : t("Add device")}
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setStep(currentStep + 1);
          }}
          flat={true}
          disabled={currentStep > steps.length - 1 || !isValid}
        >
          {t("Next")}
        </Button>
      )}
    </div>
  );
};
