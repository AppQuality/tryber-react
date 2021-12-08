import {
  BSCol,
  BSGrid,
  Card,
  Container,
  Text,
} from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import GoogleTagManager from "src/features/GoogleTagManager";
import Goodbye from "./assets/goodbye.svg";

export default function GoodbyePage() {
  const { t } = useTranslation();

  return (
    <GoogleTagManager title={t("Goodbye")}>
      <Container className="aq-pb-3">
        <BSGrid>
          <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
            <Card className="aq-my-3">
              <Text className="aq-text-center">
                <Trans
                  i18nKey="<bold>Thank you for helping to make the AppQuality Community special!</bold><br></br><bold>Your account will be deleted, </bold><br></br>but if you want to come back and test with us,<br></br> you already know where to find us.<br></br>"
                  defaults="<bold>Thank you for helping to make the AppQuality Community special!</bold><br></br><bold>Your account will be deleted, </bold><br></br>but if you want to come back and test with us,<br></br> you already know where to find us.<br></br>"
                  components={{ br: <br />, bold: <strong /> }}
                />
              </Text>
              <img
                className="aq-my-3"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  display: "block",
                }}
                src={Goodbye}
              />
            </Card>
          </BSCol>
        </BSGrid>
      </Container>
    </GoogleTagManager>
  );
}
