import { Text, Title } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetUsersMeCampaignsByCampaignIdFormsQuery } from "src/services/tryberApi";

export default function MyComponent({ node }: { node: PMNode }) {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data } = useGetUsersMeCampaignsByCampaignIdFormsQuery(
    { campaignId: id },
    { skip: !id }
  );

  const hasForms = data && data.length > 0;

  return (
    <NodeViewWrapper className="how-to-apply-node">
      <Title className="aq-mb-2">
        {t("__PREVIEW_HOW_TO_APPLY", "APPLICATION")}
      </Title>
      <Text>
        <Trans
          i18nKey="how_to_apply_description"
          defaults="To participate in this campaign
          <ol>
            <preselectionFormItem/>
            <li>Choose the device you wish to participate with;</li>
            <li>Click on Apply to this Campaign to submit your application.</li>
          </ol>
          If you are selected, you will receive all the information and instructions necessary to start the campaign."
          components={{
            ol: <ol />,
            preselectionFormItem: hasForms ? (
              <li>
                {t(
                  "__PREVIEW_HOW_TO_APPLY_PRESELECTION_STEP",
                  "Fill in the pre-selection form;"
                )}
              </li>
            ) : (
              <></>
            ),
            li: <li />,
          }}
        />
      </Text>
    </NodeViewWrapper>
  );
}
