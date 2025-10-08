import { Text } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { useParams } from "react-router-dom";
import { useDescription } from "./useDescription";
import { useGetUsersMeCampaignsByCampaignIdQuery } from "src/services/tryberApi";
import { useTranslation } from "react-i18next";

export default function MyComponent({ node }: { node: PMNode }) {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });
  const description = useDescription(id!);

  return (
    <NodeViewWrapper className="bug-type-description-node">
      <Text>{description}</Text>
      {campaign?.hasBugParade === 1 && (
        <Text>
          {t("_PAGE_PREVIEW__BUG_PARADE_ACTIVE", "The Bug Parade is active")}
        </Text>
      )}
    </NodeViewWrapper>
  );
}
