import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title size="xl">{t("__MANUAL_ACCEPT_CONTRACT_TITLE")}</Title>
      <Title>{t("__MANUAL_ACCEPT_CONTRACT_SUBTITLE")}</Title>
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
