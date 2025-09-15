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

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.material-icons {
    font-size: 2em;
  }
`;
const RecapCard = ({ id }: { id: string }) => {
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { t } = useTranslation();
  const theme = useTheme();

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="aq-mb-4">
      <Wrapper>
        <div>
          <div>
            <i
              className="material-icons"
              style={{ color: theme.colors.red400 }}
            >
              {campaign.icon}
            </i>
          </div>
          <Title size="xs">{campaign.campaign_type.name} </Title>
          <Text>{t("__MANUAL_PAGE__CAMPAIGN_TYPE", "Campaign Type")}</Text>
        </div>
        <div>
          <div>
            <i
              className="material-icons"
              style={{ color: theme.colors.green400 }}
            >
              flag
            </i>
          </div>
          <Title size="xs">{formatDate(campaign.end_date)}</Title>
          <Text>{t("__MANUAL_PAGE__END_DATE", "Deadline")}</Text>
        </div>
      </Wrapper>
      <Separator />

      <BugFormButton />
    </Card>
  );
};

/**
 * Format a date string to a more readable format.
 * @param dateStr - The date string to format.
 * @returns The formatted date string in "MM/DD HH:MM" format.
 */
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${
    date.getMonth() + 1
  }/${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`;
};

export { RecapCard };
