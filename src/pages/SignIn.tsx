import React from "react";
import {Col, Container, Grid} from "../stories/layout/Layout";
import {Card} from "../stories/card/Card";
import LoginForm from "../features/LoginForm";
import useToken from "../store/useToken";
import {useTranslation} from "react-i18next";

export default function SignIn() {
  let token = useToken();
  const { t } = useTranslation();
  return (
    <Container>
      <h2>{t("become-a-tester")}</h2>
      <Grid>
        <Col size={8}>
          <Card>
            <LoginForm setToken={token.setToken} />
          </Card>
        </Col>
      </Grid>
    </Container>
  );
}