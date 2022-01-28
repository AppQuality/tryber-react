import {
  Button,
  icons,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import careerMarketResearch from "./assets/career-market-research.png";
import careerMarketResearch2x from "./assets/career-market-research@2x.png";
import GenericSlide, { iconStyle, TextBox } from "./GenericSlide";

const TextBoxOne = styled(TextBox)`
  bottom: 12%;
  left: 6%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 6%;
  left: 51%;
`;
const Image = () => {
  const { t } = useTranslation();
  return (
    <div style={{ position: "relative" }}>
      <img
        srcSet={`${careerMarketResearch} 638w,
   ${careerMarketResearch2x} 768w`}
        sizes="(max-width: 768px) 638px,
768px"
        src={careerMarketResearch}
        alt="career market research"
      />
      <TextBoxOne>
        <icons.Bug style={iconStyle} />
        {t("This is exactly what i'm looking for!")}
      </TextBoxOne>
      <TextBoxTwo>
        <icons.Bug style={iconStyle} />
        {t("This will work perfectly for my user research")}
      </TextBoxTwo>
    </div>
  );
};

export default () => {
  const { t } = useTranslation();
  return (
    <GenericSlide image={<Image />}>
      <div className=" aq-mt-3">
        <Title size="xl" className="text-marker">
          {t("JOIN OUR MARKET RESEARCHES")}
        </Title>
        <Text className="aq-mb-2">
          {t(
            "A user who will pursue a market research career inside the TRYBER Community. That means you will be specialized in Quality Surveys, Customer Experience, Market Research and Focus Groups."
          )}
        </Text>
      </div>
      <Button type="secondary" flat className="aq-mb-4">
        {t("JOIN IN TRYBER")}
      </Button>
      <Title size="s" className="text-marker disclaimer">
        {t("Start earning today!")}
      </Title>
    </GenericSlide>
  );
};
