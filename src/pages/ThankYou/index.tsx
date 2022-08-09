import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Text,
} from "@appquality/appquality-design-system";
import { PageTemplate } from "src/features/PageTemplate";
import { StyledThankYouCard } from "./_style";
import background from "./assets/background.svg";
import empathyTryber from "./assets/empathyTryber.svg";
import title from "./assets/title.svg";
import tryber from "./assets/tryber.svg";
import i18next from "i18next";

export default function ThankYouPage() {
  return (
    <PageTemplate
      route={"thank-you"}
      shouldBeLoggedIn={localStorage.getItem("isUserLogged") === "true"}
    >
      <BSGrid>
        <BSCol size="col-12">
          <StyledThankYouCard>
            <Card className="thank-you-card">
              <div className="card-body">
                <img src={background} alt="background" />
                <div className="empathy-container">
                  <img
                    className="aq-mb-3 img-20"
                    src={empathyTryber}
                    alt="Empathy tryber"
                  />
                  <img className="img-30" src={title} alt="Empathy tryber" />
                  <Text className="aq-text-primary description">
                    <strong>
                      Your information has been entered correctly.
                    </strong>{" "}
                    We have updated the information you entered on{" "}
                    <strong>your TRYBER profile page.</strong>
                  </Text>
                  <Button
                    href={`${
                      i18next.language === "en" ? "" : "/" + i18next.language
                    }/my-account/?tab=advanced`}
                    forwardedAs="a"
                  >
                    GO TO PROFILE
                  </Button>
                </div>
                <img
                  className="thank-you-logo"
                  src={tryber}
                  alt="Logo Tryber"
                />
              </div>
            </Card>
          </StyledThankYouCard>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
