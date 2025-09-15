import { Editor, Text } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import { SlashCommands } from "src/pages/Preview/Editor/extensions/SlashCommands";
import { Payout } from "src/pages/Preview/Editor/extensions/SlashCommands/nodes/Payout";
import { useGetUsersMeCampaignsByCampaignIdPayoutDataQuery } from "src/services/tryberApi";

const PayoutRecap = ({ id }: { id: string }) => {
  const { t } = useTranslation();

  const { data: payout } = useGetUsersMeCampaignsByCampaignIdPayoutDataQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!payout) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
        {`<payout expanded="1"></payout>`}
      </Editor>
      <Text className="aq-mt-1 aq-mb-2">
        {t("__MANUAL_PAGE_MAXIMUM_PAYOUT", {
          value:
            payout.campaign_complete_bonus_eur +
            payout.payout_limit +
            payout.top_tester_bonus,
          defaultValue: "The maximum unlockable payout is €{{value}}.",
        })}
      </Text>
      <Text>
        <Trans
          i18nKey="__MANUAL_PAGE_PAYOUT_INFO"
          defaults="If you have any doubts, please consult our <faq_link>FAQ</faq_link>, where you will find
        answers to the most common questions."
          components={{
            faq_link: <a href="/faq" target="_blank" rel="noreferrer" />,
          }}
        />
      </Text>
    </>
  );
};

export { PayoutRecap };
