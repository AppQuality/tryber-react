import { Title } from "@appquality/appquality-design-system";
import React from "react";

export const Community = () => {
  return (
    <>
      <Title size="l" className="aq-my-4">
        La nostra community
      </Title>
      <div
        className="aq-my-4"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "90px",
              height: "100px",
              backgroundColor: "grey",
            }}
          ></div>
          <div>
            <Title size="m">25.000+</Title>
            <strong>tester</strong>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "90px",
              height: "100px",
              backgroundColor: "grey",
            }}
          ></div>
          <div>
            <Title size="m">25.000+</Title>
            <strong>dispositivi</strong>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "90px",
              height: "100px",
              backgroundColor: "grey",
            }}
          ></div>
          <div>
            <Title size="m">2.500+</Title>
            <strong>campagne di test</strong>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "90px",
              height: "100px",
              backgroundColor: "grey",
            }}
          ></div>
          <div>
            <Title size="m">150.000+</Title>
            <strong>bug scovati</strong>
          </div>
        </div>
      </div>
    </>
  );
};
