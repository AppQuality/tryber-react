import { Card, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import {
  useGetUsersMeBugsQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";
import { styled, useTheme } from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .bug_container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .type {
      font-size: 0.75rem;
    }
  }
`;

const useFilteredBugsUrl = () => {
  const baseUrl = useLocalizeRoute("my-bugs");

  return (campaignId: string, status: string) => {
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set("cp", campaignId);
    url.searchParams.set("status", status);
    return url.pathname + url.search;
  };
};

const LinkToBugList = ({
  count,
  campaignId,
  statusId,
  children,
}: {
  count: number;
  campaignId: string;
  statusId: string;
  children: React.ReactNode;
}) => {
  const getBugUrl = useFilteredBugsUrl();

  if (count === 0) {
    return <>{children}</>;
  }

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={getBugUrl(campaignId, statusId)}
    >
      {children}
    </Link>
  );
};

const useGetBugsCountByStatus = ({ id }: { id: string }) => {
  const { data: bugs } = useGetUsersMeBugsQuery(
    { filterBy: { campaign: id } },
    { skip: !id }
  );

  if (!bugs) {
    return {
      approved: 0,
      refused: 0,
      needReview: 0,
      pending: 0,
    };
  }

  return {
    approved: bugs.results.filter((bug) => bug.status?.id === 2).length,
    refused: bugs.results.filter((bug) => bug.status?.id === 1).length,
    needReview: bugs.results.filter((bug) => bug.status?.id === 4).length,
    pending: bugs.results.filter((bug) => bug.status?.id === 3).length,
  };
};

const BugCard = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });
  const { approved, refused, needReview, pending } = useGetBugsCountByStatus({
    id,
  });

  if (!campaign || !campaign.hasBugForm) {
    return null;
  }

  return (
    <Card
      title={t("__MANUAL_BUG_CARD_TITLE", "Bugs found")}
      className="aq-mb-4"
    >
      <Wrapper>
        <LinkToBugList campaignId={id} statusId="2" count={approved}>
          <Text
            style={{ color: theme.palette.success }}
            className="bug_container"
          >
            <b>{approved}</b>
            <span className="type">
              {t("__MANUAL_BUG_CARD_APPROVED", "APPROVED")}
            </span>
          </Text>
        </LinkToBugList>
        <LinkToBugList campaignId={id} statusId="1" count={refused}>
          <Text
            style={{ color: theme.palette.danger }}
            className="bug_container"
          >
            <b>{refused}</b>
            <span className="type">
              {t("__MANUAL_BUG_CARD_REFUSED", "REFUSED")}
            </span>
          </Text>
        </LinkToBugList>
        <LinkToBugList campaignId={id} statusId="4" count={needReview}>
          <Text
            className="bug_container"
            style={{ color: theme.palette.warning }}
          >
            <b>{needReview}</b>
            <span className="type">
              {t("__MANUAL_BUG_CARD_NEED_REVIEW", "NEED REVIEW")}
            </span>
          </Text>
        </LinkToBugList>
        <LinkToBugList campaignId={id} statusId="3" count={pending}>
          <Text className="bug_container" style={{ color: theme.palette.info }}>
            <b>{pending}</b>
            <span className="type">
              {t("__MANUAL_BUG_CARD_PENDING", "PENDING")}
            </span>
          </Text>
        </LinkToBugList>
      </Wrapper>
    </Card>
  );
};

export { BugCard };
