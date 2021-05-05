import React, { useEffect,useState } from "react"
import { Container, BSGrid, BSCol } from "../stories/layout/Layout"
import { Card } from "../stories/card/Card"
import Spinner from "../stories/spinner/Spinner"
import { H5 } from "../stories/typography/Typography"
import { useTranslation } from "react-i18next"
import API from "../utils/api"
import styled from "styled-components"
import {SignupMailSocial} from "../features/SignupMailSocial";


export default function GettingStarted() {
  const [isLoading, setisLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState(t("Loading"));
  const redirectUrl =
    i18n.language === "en" ? "/my-dashboard/" : "/it/la-mia-dashboard/";

  useEffect(() => {
    API.me()
      .then((res) => {
        // user logged in
        setLoadingMessage(t('Redirecting to your dashboard...'))
        window.location.href = redirectUrl;
      })
      .catch((e) => {
        if (e.statusCode === 403) {
          setisLoading(false)
          // user logged out, proceed
        } else {
          alert(e.message);
        }
      });
  }, [redirectUrl, t]);

  const SpinnerWrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    min-height: 60vh;
  `
  if (isLoading) {
    return (
      <Container>
        <SpinnerWrapper>
          <Spinner/><H5>{loadingMessage}</H5>
        </SpinnerWrapper>
      </Container>
    )
  }
  return (
    <Container>
      <h2>{t("become-a-tester")}</h2>
      <BSGrid>
        <BSCol size="col-lg-8 col-xxl-7">
          <Card>
            <SignupMailSocial />
          </Card>
        </BSCol>
      </BSGrid>
    </Container>
  );
}
