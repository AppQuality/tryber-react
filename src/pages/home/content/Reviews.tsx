import { Title, Text, Card } from "@appquality/appquality-design-system";
import { Alarm } from "react-bootstrap-icons";
import React from "react";

export const Reviews = () => {
  return (
    <>
      <Title size="xl" className="aq-text-center">
        I consigli dei nostri tester
      </Title>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "314px", padding: "30px" }}>
          <Card>
            <Alarm />
            <Text color="success">
              <strong>Gestisci il tuo tempo</strong>
            </Text>
            <Text>
              <strong>Testa quando e dove vuoi</strong>
            </Text>
            <Text>
              L’importante è rispettare la data di chiusura della Campagna di
              Test
            </Text>
          </Card>
        </div>
        <div style={{ width: "314px", padding: "30px" }}>
          <Card>
            <Alarm />
            <Text color="success">
              <strong>Gestisci il tuo tempo</strong>
            </Text>
            <Text>
              <strong>Testa quando e dove vuoi</strong>
            </Text>
            <Text>
              L’importante è rispettare la data di chiusura della Campagna di
              Test
            </Text>
          </Card>
        </div>
        <div style={{ width: "314px", padding: "30px" }}>
          <Card>
            <Alarm />
            <Text color="success">
              <strong>Gestisci il tuo tempo</strong>
            </Text>
            <Text>
              <strong>Testa quando e dove vuoi</strong>
            </Text>
            <Text>
              L’importante è rispettare la data di chiusura della Campagna di
              Test
            </Text>
          </Card>
        </div>
      </div>
    </>
  );
};
