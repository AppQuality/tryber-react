import { Button, Text, Title } from "@appquality/appquality-design-system";
import i18next from "i18next";
import styled from "styled-components";
import unauthorizedBackground from "./assets/unauthorizedBackground.svg";
import unauthorizedIcon from "./assets/unauthorizedIcon.svg";

const StyledBugFormUnauthorized = styled.div`
  text-align: center;
  position: relative;
  margin: 4em 0;

  .unauthorized-empathy {
    position: absolute;
    top: 15px;
    left: 0;
    right: 10px;
    margin: auto;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 30%;
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    .unauthorized-empathy {
      top: 110px;
      width: 26em;
      img {
        width: auto;
      }
    }
  }
`;

export const BugFormUnauthorized = () => {
  return (
    <StyledBugFormUnauthorized>
      <img src={unauthorizedBackground} alt="Unauthorized background" />
      <div className="unauthorized-empathy">
        <img
          className="aq-mb-3"
          src={unauthorizedIcon}
          alt="Unauthorized icon"
        />
        <Title size="ms">There is nothing to see here</Title>
        <Text className="aq-text-primary aq-mt-3 aq-mb-3">
          We couldn't find the URL you typed: this is a page that doesn't exist.
          <br />
          (Maybe that's why the Tryber is a little sad)
        </Text>
        <Button
          href={`${
            i18next.language === "en" ? "" : "/" + i18next.language
          }/my-dashboard/`}
          forwardedAs="a"
        >
          Torna alla dashboard
        </Button>
      </div>
    </StyledBugFormUnauthorized>
  );
};
