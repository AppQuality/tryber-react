import React from "react";
import I18n from "../I18n";
import {Col, Container, Grid} from "../stories/layout/Layout";
import {Card} from "../stories/card/Card";
import LoginForm from "../features/LoginForm";
import useToken from "../store/useToken";

export default function SignIn() {
  let token = useToken();
  return (
    <Container>
      <h2><I18n t="become-a-tester" /></h2>
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