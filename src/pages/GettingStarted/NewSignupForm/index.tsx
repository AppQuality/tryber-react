import {
  Card,
  Container,
  DatepickerGlobalStyle,
  Steps,
  Title,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { PageTemplate } from "src/features/PageTemplate";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import styled from "styled-components";
import Step0 from "./Step0";
import Step1 from "./Step0";

const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const SignupForm = ({}) => {
  const { t } = useTranslation();
  const dashboard = useLocalizeRoute("my-dashboard");
  const emailSignup = useLocalizeRoute("getting-started/signup");
  const [step, setStep] = useState(0);
  return (
    <PageTemplate route={emailSignup}>
      <DatepickerGlobalStyle />
      <Container className="aq-pb-3">
        <LangMenu
          className="aq-mt-3"
          itLink="/it/getting-started/signup"
          esLink="/es/getting-started/signup"
          enLink="/getting-started/signup"
        />
        <Wrapper>
          <Title style={{ textAlign: "center" }} size="l" as={"h1"}>
            {t("Signup for Tryber")}
          </Title>
          <Card data-qa="tryber-mail-signup">
            <Steps current={step} className="aq-mb-3" data-qa="signup-stepper">
              <Steps.Step
                title={t("SIGNUP_STEP_TITLE:::Account info")}
                isCompleted={step > 0}
              />
              <Steps.Step title={t("SIGNUP_STEP_TITLE:::Personal info")} />
            </Steps>

            {step === 0 && <Step0 setStep={setStep} />}
            {step === 1 && <Step1 setStep={setStep} />}
          </Card>
        </Wrapper>
      </Container>
    </PageTemplate>
  );
};

export default SignupForm;
