import { Card, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsByCampaignIdQuery } from "src/services/tryberApi";
import { styled, useTheme } from "styled-components";
import BugFormButton from "./BugFormButton";
const Separator = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.elementGeneric};
  margin: 1em 0;
  padding: 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  > div,
  .title_row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.material-icons {
    font-size: 2em;
  }
`;
const CampaignCard = ({ id }: { id: string }) => {
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });
  const { t } = useTranslation();
  const theme = useTheme();
  const formatDate = useFormatDate();

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="aq-mb-4">
      <Wrapper>
        <div>
          <div
            className="title_row"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Title size="xs">
              {t("__MANUAL_PAGE__CAMPAIGN_TYPE", "Campaign Type")}
            </Title>
            <i
              className="material-icons"
              style={{ color: theme.colors.red400 }}
            >
              {campaign.campaign_type.icon}
            </i>
          </div>
          <Text>{campaign.campaign_type.name} </Text>
        </div>
        <div>
          <div className="title_row">
            <Title size="xs">{t("__MANUAL_PAGE__END_DATE", "Deadline")}</Title>
            <i
              className="material-icons"
              style={{ color: theme.colors.green400 }}
            >
              flag
            </i>
          </div>
          <Text>{formatDate(campaign.end_date)}</Text>
        </div>
      </Wrapper>
      <Separator />

      <BugFormButton />
    </Card>
  );
};

const useFormatDate = () => {
  const { i18n } = useTranslation();
  return (dateStr: string) => {
    const date = new Date(dateStr);
    const formatted = new Intl.DateTimeFormat(i18n.language, {
      day: "2-digit",
      month: "long",
    }).format(date);
    return (
      <div style={{ textAlign: "center" }}>
        <Text>{`${formatted}`}</Text>
        <Text small>{`h ${date.getHours()}:${date.getMinutes()}`}</Text>
      </div>
    );
  };
};

export { CampaignCard };
