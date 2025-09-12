import { Text, Title } from "@appquality/appquality-design-system";
import {
  useGetUsersMeCampaignsByCampaignIdPayoutDataQuery,
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";
import { styled, useTheme } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.material-icons {
    font-size: 3em;
  }
`;

const useCampaignData = (id: string) => {
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { data: payout } = useGetUsersMeCampaignsByCampaignIdPayoutDataQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data || !campaign || !payout) {
    return null;
  }

  return {
    startDate: formatDate(data.startDate),
    endDate: formatDate(data.endDate),
    points: payout.campaign_pts,
    type: { name: campaign.campaign_type.name, icon: campaign.icon },
    payout: {
      min: payout.campaign_complete_bonus_eur,
      max:
        payout.campaign_complete_bonus_eur +
        payout.payout_limit +
        payout.top_tester_bonus,
    },
  };
};

const RecapBox = ({ id }: { id: string }) => {
  const theme = useTheme();
  const campaignData = useCampaignData(id);
  if (!campaignData) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <div>
        <div>
          <i className="material-icons" style={{ color: theme.colors.red400 }}>
            {campaignData.type.icon}
          </i>
        </div>
        <Title>{campaignData.type.name} </Title>
        <Text>Campaign Type</Text>
      </div>
      <div>
        <div>
          <i className="material-icons" style={{ color: theme.colors.blue400 }}>
            calendar_month
          </i>
        </div>
        <Title>
          {campaignData.startDate} - {campaignData.endDate}
        </Title>
        <Text>Testing Phase</Text>
      </div>
      <div>
        <div>
          <i
            className="material-icons"
            style={{ color: theme.colors.yellow400 }}
          >
            diamond
          </i>
        </div>
        <Title>{campaignData.points}</Title>
        <Text>Experience Points</Text>
      </div>
      <div>
        <div>
          <i
            className="material-icons"
            style={{ color: theme.colors.green400 }}
          >
            payments
          </i>
        </div>
        <Title>
          {campaignData.payout.min}€ - {campaignData.payout.max}€
        </Title>
        <Text>Payout</Text>
      </div>
    </Wrapper>
  );
};
function formatDate(date: string) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

export default RecapBox;
