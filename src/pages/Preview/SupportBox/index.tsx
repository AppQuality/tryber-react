import { Card, Title } from "@appquality/appquality-design-system";
import { styled } from "styled-components";

const MailLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  justify-content: center;
`;

const SupportBox = () => {
  return (
    <Card style={{ textAlign: "center" }}>
      <Title size="s" className="aq-mb-2">
        Any questions?
      </Title>
      <MailLink
        href="mailto:support@tryber.me"
        target="_blank"
        rel="noreferrer"
      >
        <i className="material-icons">mail</i>
        <span>Drop an email to TRYBER TEAM</span>
      </MailLink>
    </Card>
  );
};

export default SupportBox;
