import { Text, Title } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"; // Import useParams to get the campaign ID
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";

const useDescription = (id: string) => {
  const { t } = useTranslation();
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  switch (data?.type?.name) {
    case "Bug verification":
      return (
        <div className="aq-mb-3">
          <Title className="aq-mb-2">
            {t("__PREVIEW_METHODOLOGY_TITLE", "METHODOLOGY ")}
          </Title>
          <Trans
            i18nKey="bug_verification_description"
            defaults="The methodology used for this campaign is Bug Hunting. For a complete guide on how to perform the test correctly open the <guide_link>dedicated article.</guide_link>"
            components={{
              guide_link: (
                <a
                  href="/practical-guide-to-bug-hunting/"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
            }}
          />
        </div>
      );
    default:
      return "";
  }
};

export default function MyComponent({ node }: { node: PMNode }) {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const description = useDescription(id!);

  return (
    <NodeViewWrapper className="bug-type-description-node">
      <Text>{description}</Text>
    </NodeViewWrapper>
  );
}
