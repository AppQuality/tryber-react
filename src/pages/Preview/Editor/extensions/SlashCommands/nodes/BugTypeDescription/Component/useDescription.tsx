import { Text, Title } from "@appquality/appquality-design-system";
import { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";

const MethodologyWrapper = ({
  children,
  hasBugParade,
}: {
  children: ReactNode;
  hasBugParade?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="aq-mb-3">
      <Title className="aq-mb-2">
        {t("__PREVIEW_METHODOLOGY_TITLE", "METHODOLOGY ")}
      </Title>
      {children}
      {hasBugParade && (
        <Text>
          {t("_PAGE_PREVIEW__BUG_PARADE_ACTIVE", "The Bug Parade is active")}
        </Text>
      )}
    </div>
  );
};

export const useDescription = (id: string) => {
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });

  const typeName = data?.type?.name;

  if (!typeName) return "";

  switch (typeName) {
    case "Exploratory Testing":
    case "Explorative Testing":
    case "Bug verification":
      return (
        <MethodologyWrapper hasBugParade={campaign?.hasBugParade === 1}>
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
        </MethodologyWrapper>
      );
    case "Usability Test":
      return (
        <MethodologyWrapper hasBugParade={campaign?.hasBugParade === 1}>
          <Trans
            i18nKey="usability_test_description"
            defaults="The methodology used for this campaign is Thinking Aloud. For a complete guide on how to perform the test correctly open the <guide_link>dedicated article.</guide_link>"
            components={{
              guide_link: (
                <a
                  href="/unmoderated-test-thinking-aloud/"
                  target="_blank"
                  rel="noreferrer"
                />
              ),
            }}
          />
        </MethodologyWrapper>
      );
    default:
      return null;
  }
};
