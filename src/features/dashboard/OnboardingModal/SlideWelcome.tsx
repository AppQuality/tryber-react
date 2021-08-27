import { useTranslation } from "react-i18next";
import welcomeImg from "./assets/welcome.png";
import { Text } from "@appquality/appquality-design-system";

export default () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <img src={welcomeImg} />
      </div>
      <Text>
        {t(
          "You are few steps away from making your experience memorable in the AppQuality Community World!"
        )}
      </Text>
    </div>
  );
};
