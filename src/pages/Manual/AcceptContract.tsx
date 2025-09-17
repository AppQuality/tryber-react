import { Button, Text, Title } from "@appquality/appquality-design-system";
import WPAPI from "src/utils/wpapi";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  padding: 2rem;
`;

const AcceptContract = ({ id }: { id: string }) => {
  return (
    <Wrapper>
      <Title size="xl">Abbiamo bisogno di te!</Title>
      <Title>Pronto? Inizia la Campagna</Title>
      <Button
        flat
        kind="secondary"
        onClick={async () => {
          await WPAPI.startCampaign(id);
          window.location.reload();
        }}
      >
        Clicca per iniziare
      </Button>
      <Text>
        Cliccando su questo pulsante accetti il contratto ed i nostri attuali
        Termini & Condizioni
      </Text>
    </Wrapper>
  );
};

export default AcceptContract;
