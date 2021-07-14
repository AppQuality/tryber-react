import {
  BSCol,
  BSGrid,
  Button,
  PageTitle,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React from "react";
import { ReactComponent as TopShape } from "../assets/rectangle-top.svg";
import people from "../assets/group-1349.png";

export const BannerTop = () => {
  return (
    <BSGrid>
      <BSCol size="col-lg-7">
        <PageTitle>
          <Title size="xl">
            Entra nella prima Community di Tester italiana!
          </Title>
        </PageTitle>
        <Text className="aq-my-4">
          Ti è mai capitato di navigare su internet con il tuo smartphone o il
          computer e imbatterti in un’app o un sito web poco intuitivo o con
          errori?{" "}
        </Text>
        <Text>
          Con AppQuality
          <strong>
            avrai l'opportunità di utilizzare servizi e app di grandi aziende
          </strong>
          , segnalare i comportamenti anomali che riscontri e migliorare
          l'esperienza offerta all'utente.
          <strong>I tuoi feedback e il tuo lavoro sono preziosi!</strong>
        </Text>
        <Button type="success" className="aq-my-4">
          Registrati Ora!
        </Button>
      </BSCol>
      <BSCol size="col-lg-5">
        <div style={{ position: "relative" }}>
          <TopShape />
          <div
            style={{
              position: "absolute",
              top: "120px",
              left: "30px",
            }}
          >
            <img src={people} />
          </div>
        </div>
      </BSCol>
    </BSGrid>
  );
};
