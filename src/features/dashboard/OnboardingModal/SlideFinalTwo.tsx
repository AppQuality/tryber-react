import { Title, Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import API from "../../../utils/api";

export default ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="aq-py-3">
        <Title size="xs">{t("FinalSlide 2/2")}</Title>
        {t(
          "Take part in the Basic Course now and earn 200 experience points, essential to increase your chances of being selected for the Test Campaigns. You will learn more about the world of AppQuality and you can receive a Linkedin certification to prove that you are a qualified AppQuality Tester."
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            flat
            type="success"
            onClick={() => {
              API.setOnboardingComplete();
              onClose();
            }}
          >
            {t("Go to your dashoard")}
          </Button>
        </div>
      </div>
    </>
  );
};
