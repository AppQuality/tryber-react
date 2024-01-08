import {
  Card,
  Container,
  DatepickerGlobalStyle,
  Steps,
  Title,
} from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { PageTemplate } from "src/features/PageTemplate";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import styled from "styled-components";
import FormProvider, { SignupFormType } from "./FormProvider";
import Step0 from "./Step0";
import Step1 from "./Step1";

const Wrapper = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    max-width: 650px;
    margin: 0 auto;
  }
`;

const SignupForm = ({}) => {
  const { t } = useTranslation();
  const emailSignup = useLocalizeRoute("getting-started/signup");
  return (
    <PageTemplate
      shouldBeLoggedIn={false}
      route={emailSignup}
      pageTitle={t("Signup for Tryber")}
    >
      <DatepickerGlobalStyle />
      <Container className="aq-pb-3">
        <LangMenu
          className="aq-mt-3"
          itLink="/it/getting-started/signup"
          esLink="/es/getting-started/signup"
          enLink="/getting-started/signup"
        />
        <Wrapper>
          <Title
            style={{ textAlign: "center" }}
            size="l"
            as={"h1"}
            className="aq-mb-3 aq-pt-3"
          >
            {t("Signup for Tryber")}
          </Title>
          <Card data-qa="tryber-mail-signup">
            <FormProvider>
              {(formikProps: FormikProps<SignupFormType>) => {
                const { step } = formikProps.values;
                return (
                  <>
                    <Steps
                      current={step}
                      className="aq-mb-3"
                      data-qa="signup-stepper"
                    >
                      <Steps.Step
                        title={t("SIGNUP_STEP_TITLE:::Account info")}
                        isCompleted={step > 0}
                      />
                      <Steps.Step
                        title={t("SIGNUP_STEP_TITLE:::Personal info")}
                      />
                    </Steps>
                    {step === 0 && <Step0 />}
                    {step === 1 && <Step1 />}
                  </>
                );
              }}
            </FormProvider>
          </Card>
        </Wrapper>
      </Container>
    </PageTemplate>
  );
};

export default SignupForm;
