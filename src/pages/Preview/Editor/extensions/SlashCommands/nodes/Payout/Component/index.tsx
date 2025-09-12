import { Text } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetUsersMeCampaignsByCampaignIdPayoutDataQuery } from "src/services/tryberApi";

const CompleteBonus = ({
  campaign_complete_bonus_eur,
  minimum_bugs,
  percent_usecases,
}: {
  campaign_complete_bonus_eur: number;
  minimum_bugs: number;
  percent_usecases: number;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Text as="span">
        <strong>€{campaign_complete_bonus_eur}</strong>
      </Text>{" "}
      {minimum_bugs > 0 || percent_usecases > 0 ? "with" : ""}
      <ul style={{ listStyleType: "disc", paddingLeft: "20px", margin: 0 }}>
        {minimum_bugs > 0 && (
          <li>
            {t(" minimum {{count}} bugs approved, for participation", {
              count: minimum_bugs,
            })}
          </li>
        )}
        {percent_usecases > 0 && (
          <li>
            {t(" completion of {{percent}} of required activities", {
              percent:
                percent_usecases === 100
                  ? "all"
                  : `at least ${percent_usecases}%`,
            })}
          </li>
        )}
      </ul>
    </>
  );
};

export default function MyComponent() {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetUsersMeCampaignsByCampaignIdPayoutDataQuery(
    { campaignId: id! },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <NodeViewWrapper className="payout-node">
      <h3>PAYOUT</h3>
      <p>For this Campaign you will be rewarded as follows:</p>
      <ul>
        <li>
          <CompleteBonus {...data} />
        </li>
        {data.payout_limit > 0 && (
          <li>
            <Text as="span">
              <strong>+ max €{data.payout_limit}</strong>
            </Text>{" "}
            based on reported bugs and their severity
          </li>
        )}
        {data.top_tester_bonus > 0 && (
          <li>
            <Text as="span">
              <strong>+ €{data.top_tester_bonus} </strong>
            </Text>
            for the TRYBER with the best performance
          </li>
        )}
      </ul>
      <p>
        If you are in doubt about how payments work, please consult our{" "}
        <a href="/wallet-how-does-it-work/" target="_blank" rel="noopener">
          <u>Payment Guide</u>
        </a>
        .
      </p>
    </NodeViewWrapper>
  );
}
