import { Card, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import { styled } from "styled-components";

const MailLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  justify-content: center;
`;

const SupportBox = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    {
      campaignId: id,
    },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ textAlign: "center" }}>
      <Title size="s" className="aq-mb-2">
        {t("__PREVIEW_PAGE__ANY_QUESTIONS", "Any questions?")}
      </Title>
      <MailLink
        href="mailto:support@tryber.me"
        target="_blank"
        rel="noreferrer"
      >
        <i className="material-icons">mail</i>
        <span>
          {t("__PREVIEW_PAGE__DROP_EMAIL", "Drop an email to TRYBER TEAM")}
        </span>
      </MailLink>
    </Card>
  );
};

export default SupportBox;
