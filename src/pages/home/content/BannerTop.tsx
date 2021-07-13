import {
  BSCol,
  Button,
  PageTitle,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React from "react";

export const BannerTop = () => {
  return (
    <BSCol size="col-7">
      <PageTitle>
        <Title size="xl">Entra nella prima Community di Tester italiana!</Title>
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
  );
};
