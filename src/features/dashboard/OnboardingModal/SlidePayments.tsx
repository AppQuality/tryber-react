import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import screenshotEng from "./assets/pagamenti_eng.png";
import screenshotIta from "./assets/pagamenti_ita.png";
import { OnBoardingSlide } from "./OnBoardingSlide";

export default () => {
  const { t, i18n } = useTranslation();
  const renderImg = () => {
    switch (i18n.language) {
      case "en":
        return screenshotEng;
      case "it":
        return screenshotIta;
      default:
        return screenshotEng;
    }
  };
  return (
    <OnBoardingSlide>
      <div className="main-img aq-mb-3">
        <img src={renderImg()} />
      </div>
      <Title className="aq-mb-2" size="xs" as="h3">
        {t("Your efforts will pay off")}
      </Title>
      <Text>
        {t(
          "With your work you can unlock cash prizes and/or experience points." +
            " Before each activity you will be informed of the expected prize, which will vary depending on the effort required: from a few euros to hundreds." +
            " Remember that you can unlock it only by completing the activity! In the payment section you can view your situation and request at any time the payout accumulated via Paypal or bank transfer."
        )}
      </Text>
    </OnBoardingSlide>
  );
};
