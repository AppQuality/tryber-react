import { Text, Title } from "@appquality/appquality-design-system";
import { NodeViewWrapper } from "@tiptap/react";
import { Node as PMNode } from "prosemirror-model";
import { Trans, useTranslation } from "react-i18next";
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
    <Text>
      <strong>{campaign_complete_bonus_eur}€</strong>{" "}
      {minimum_bugs > 0 || percent_usecases > 0
        ? t("PAYOUT_BOX_COMPLETE_BONUS_WITH", " with")
        : ""}
      <ul style={{ listStyleType: "circle", paddingLeft: "20px", margin: 0 }}>
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
                  ? t("PAYOUT_BOX_COMPLETE_BONUS_ALL_USECASES", "all")
                  : t("PAYOUT_BOX_COMPLETE_BONUS_AT_LEAST", {
                      defaultValue: "at least {{percent}}%",
                      percent: percent_usecases,
                    }),
            })}
          </li>
        )}
      </ul>
    </Text>
  );
};

export default function MyComponent({ node }: { node: PMNode }) {
  const { t } = useTranslation();
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
      <div className="aq-mb-3">
        <Title size="sm" className="aq-mb-2">
          {t("PAYOUT")}
        </Title>
        <Text>
          {t("For this Campaign you will be rewarded as follows:")}
          <ul>
            <li>
              <CompleteBonus {...data} />
            </li>
            {data.payout_limit > 0 && (
              <li>
                <Trans
                  i18nKey="available tags: <b></b>:::PAYOUT_BOX_MAX_PAYOUT"
                  components={{
                    b: <strong />,
                  }}
                  values={{
                    pay: data.payout_limit,
                  }}
                  defaults={`<b>+ max {{pay}}€</b> based on reported bugs and their severity`}
                />
                {node.attrs.expanded === 1 && (
                  <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
                    {data.critical_bug_payout && (
                      <li>
                        {t(
                          "PAYOUT_BOX_MAX_PAYOUT_CRITICAL_BUG",
                          "{{value}}€ for each approved Critical",
                          { value: data.critical_bug_payout }
                        )}
                      </li>
                    )}
                    {data.high_bug_payout && (
                      <li>
                        {t(
                          "PAYOUT_BOX_MAX_PAYOUT_HIGH_BUG",
                          "{{value}}€ for each approved High",
                          { value: data.high_bug_payout }
                        )}
                      </li>
                    )}
                    {data.medium_bug_payout && (
                      <li>
                        {t(
                          "PAYOUT_BOX_MAX_PAYOUT_MEDIUM_BUG",
                          "{{value}}€ for each approved Medium",
                          { value: data.medium_bug_payout }
                        )}
                      </li>
                    )}
                    {data.low_bug_payout > 0 && (
                      <li>
                        {t(
                          "PAYOUT_BOX_MAX_PAYOUT_LOW_BUG",
                          "{{value}}€ for each approved Low",
                          { value: data.low_bug_payout }
                        )}
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}
            {data.top_tester_bonus > 0 && (
              <li>
                <Trans
                  i18nKey="available tags: <b></b>:::PAYOUT_BOX_TOP_TESTER_BONUS"
                  components={{
                    b: <strong />,
                  }}
                  values={{
                    pay: data.top_tester_bonus,
                  }}
                  defaults={`<b>+ {{pay}}€</b> for the TRYBER with the best performance`}
                />
              </li>
            )}
          </ul>
          <Trans
            i18nKey="available tags: <a></a>:::PAYOUT_BOX_PAYMENT_GUIDE"
            components={{
              a: (
                <a
                  href="/wallet-how-does-it-work/"
                  target="_blank"
                  rel="noopener"
                />
              ),
            }}
            defaults="
        If you are in doubt about how payments work, please consult our
        <a>Payment Guide</a>."
          />
        </Text>
      </div>
    </NodeViewWrapper>
  );
}
