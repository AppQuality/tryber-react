import {
  BSCol,
  BSGrid,
  Card,
  Editor,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import { styled } from "styled-components";
import AcceptedDevices from "./AcceptedDevices";
import pattern from "./assets/tryber_pattern.svg";
import { SlashCommands } from "./Editor/extensions/SlashCommands";
import { BugTypeDescription } from "./Editor/extensions/SlashCommands/nodes/BugTypeDescription";
import { HowToApply } from "./Editor/extensions/SlashCommands/nodes/HowToApply";
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
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <StyledPageTemplate>
      <PageTemplate
        title={data.title}
        heading={`CP${id} - ${data.type.name}`}
        route={`campaigns/${id}/preview/`}
        shouldBeLoggedIn
      >
        <Card shadow className="aq-my-4">
          <RecapBox id={id} />
        </Card>
        <BSGrid>
          <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
            <Card className="aq-mb-4">
              <Editor
                editorProps={{
                  handleDOMEvents: {
                    drop: (view, e) => {
                      e.preventDefault();
                    },
                  },
                }}
                editable={false}
                extensions={[
                  BugTypeDescription,
                  Payout,
                  HowToApply,
                  SlashCommands,
                ]}
              >
                {data.content}
              </Editor>
            </Card>
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
