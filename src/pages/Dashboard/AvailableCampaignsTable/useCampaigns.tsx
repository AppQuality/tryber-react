import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import getTranslatableLink from "src/features/getTranslatableLink";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";
import { styled } from "styled-components";

const AvailabilityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "available":
      return <>👉</>;
    case "unavailable":
      return <>❌</>;
    case "candidate":
      return <>⏳</>;
    default:
      return <>{type}</>;
  }
};

const TableCell = styled.span<{
  available: boolean;
}>`
  opacity: ${(props) => (props.available ? "1" : "0.6")};
`;

const useCampaigns = ({ page, order, orderBy }: CampaignsTableProps) => {
  const { t, i18n } = useTranslation();

  const limit = 10;
  const { data, isFetching } = useGetUsersMeCampaignsQuery({
    start: (page - 1) * limit,
    limit: limit,
    filterBy: {
      completed: "0",
    },
    order: order,
    orderBy: orderBy,
  });

  const campaigns = data?.results?.map((cp) => {
    let previewLink =
      window.location.origin +
      getTranslatableLink(cp.preview_link, i18n.language);

    function isUnavailable() {
      return cp.visibility?.type === "unavailable";
    }
    function getActionButtonText() {
      if (previewLink === "#") return t("Not available");
      if (cp.visibility?.type === "candidate" || isUnavailable())
        return t("View");
      return t("Apply now");
    }
    function getActionButtonType() {
      if (previewLink === "#") return "link-hover";
      if (cp.visibility?.type === "candidate" || isUnavailable())
        return "link-hover";
      return "link";
    }

    return {
      key: cp.id ? cp.id : 0,
      campaignName: {
        content: (
          <TableCell available={!isUnavailable()}>
            {cp.id ? `[CP${cp.id}] - ` : ""}
            {cp.name}
          </TableCell>
        ),
        title: cp.name,
      },
      type: {
        content: (
          <TableCell available={!isUnavailable()}>{cp.campaign_type}</TableCell>
        ),
        title: cp.campaign_type.toString(),
      },
      startDate: {
        content: (
          <TableCell available={!isUnavailable()}>
            {dateFormatter(cp.dates.start)}
          </TableCell>
        ),
        title: dateFormatter(cp.dates.start),
      },
      endDate: {
        content: (
          <TableCell available={!isUnavailable()}>
            {dateFormatter(cp.dates.end)}
          </TableCell>
        ),
        title: dateFormatter(cp.dates.end),
      },
      availability: {
        title:
          cp.visibility?.type === "available"
            ? t(`Open for you! Apply now.`)
            : cp.visibility?.type === "unavailable"
            ? t(`Oops, this one's not available.`)
            : cp.visibility?.type === "candidate"
            ? t(`You're in the running. Fingers crossed!`)
            : cp.visibility?.type,
        content: <AvailabilityIcon type={cp.visibility?.type || ""} />,
      },
      actions: {
        title: "",
        content: (
          <TableCell available={!isUnavailable()}>
            <Button
              className="aq-nopadding"
              disabled={previewLink === "#"}
              forwardedAs="a"
              href={previewLink}
              kind={getActionButtonType()}
              size="sm"
            >
              {getActionButtonText()}
            </Button>
          </TableCell>
        ),
      },
    };
  });
  return { data, campaigns, isLoading: isFetching };
};

export default useCampaigns;
