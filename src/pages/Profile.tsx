import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";
import TesterSidebar from "../features/TesterSidebar";

export default function Profile() {
  const { t } = useTranslation();
  return (
    <GoogleTagManager title={t("Uploaded Bugs")}>
      <LoggedOnly>
        <TesterSidebar route={"my-account"}>
          <Container className="aq-pb-3">
            <PageTitle size="regular" as="h2" className="aq-mb-3">
              {t("Profile")}
            </PageTitle>
            <BSGrid>
              <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
                <Card className="aq-mb-3"></Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <Card
                  className="stick-to-header-lg aq-mb-3"
                  title={t("Fiscal Profile")}
                  shadow={true}
                ></Card>
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
