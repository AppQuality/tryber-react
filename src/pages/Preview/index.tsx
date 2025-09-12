import {
  BSCol,
  BSGrid,
  Card,
  Editor,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import AcceptedDevices from "./AcceptedDevices";
import pattern from "./assets/tryber_pattern.svg";
import { SlashCommands } from "./Editor/extensions/SlashCommands";
import { Payout } from "./Editor/extensions/SlashCommands/nodes/Payout";
import RecapBox from "./RecapBox";
import SelectBox from "./SelectionBox";
import SupportBox from "./SupportBox";

const background = pattern;

const StyledPageTemplate = styled.div`
  background-image: url(${background});
  min-height: 240px;
  background-color: ${({ theme }) => theme.colors.purple100};
`;

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data || !campaign) {
    return <div>Loading...</div>;
  }

  return (
    <StyledPageTemplate>
      <PageTemplate
        title={campaign.title}
        heading={`CP${campaign.id} - ${campaign.campaign_type.name}`}
        route={`campaigns/${id}/preview`}
        shouldBeLoggedIn
      >
        <Card shadow className="aq-my-4">
          <RecapBox id={id} />
        </Card>
        <BSGrid>
          <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
            <div className="aq-mb-4">
              <Editor
                editorProps={{
                  handleDOMEvents: {
                    drop: (view, e) => {
                      e.preventDefault();
                    },
                  },
                }}
                editable={false}
                extensions={[Payout, SlashCommands]}
              >
                {data.content}
              </Editor>
            </div>
            <SelectBox />
          </BSCol>
          <BSCol size="col-lg-3">
            <div className="aq-mb-4">
              <AcceptedDevices id={id} />
            </div>
            <div>
              <SupportBox id={id} />
            </div>
          </BSCol>
        </BSGrid>
      </PageTemplate>
    </StyledPageTemplate>
  );
};

export default Preview;
