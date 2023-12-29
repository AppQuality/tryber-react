import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ResetPasswordAreaGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-areas: "text button";
  grid-template-areas:
    "text"
    "button";
  @media screen and (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-areas: "text button";
  }
`;

const ResetPasswordArea = () => {
  const { t } = useTranslation();
  return (
    <>
      <Title size="xs" className="aq-mb-2">
        {t("Reset password")}
      </Title>
      <ResetPasswordAreaGrid>
        <Text>
          {t(
            "If you don't remember your password, you can just ask for a new one."
          )}
        </Text>
        <Button
          forwardedAs="a"
          kind="link"
          size="block"
          target="_blank"
          href="/wp-login.php?action=lostpassword"
        >
          {t("Request now")}
        </Button>
      </ResetPasswordAreaGrid>
    </>
  );
};

export default ResetPasswordArea;
