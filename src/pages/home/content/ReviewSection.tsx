import { Title } from "@appquality/appquality-design-system";
import { StyledSection } from "../_styles";
import { Reviews } from "./Reviews";
import { useTranslation } from "react-i18next";

export const ReviewSection = () => {
  const { t } = useTranslation();
  return (
    <StyledSection>
      <Title
        size="xl"
        className="text-marker aq-text-center section-title-wrapper aq-mb-4"
      >
        {t("Our Testers advices")}
      </Title>
      <div className="section-content-wrapper aq-pt-3">
        <Reviews />
      </div>
    </StyledSection>
  );
};
