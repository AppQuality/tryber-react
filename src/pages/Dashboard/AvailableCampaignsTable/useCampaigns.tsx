import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import getTranslatableLink from "src/features/getTranslatableLink";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";

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

    return {
      key: cp.id ? cp.id : 0,
      campaignName: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
      type: cp.campaign_type,
      startDate: dateFormatter(cp.dates.start),
      endDate: dateFormatter(cp.dates.end),
      actions: {
        title: ``,
        content: (
          <Button
            className="aq-nopadding"
            disabled={previewLink === "#"}
            forwardedAs="a"
            href={previewLink}
            kind="link-hover"
            size="sm"
          >
            {previewLink === "#"
              ? t("Not available")
              : cp.applied
              ? t("View")
              : t("Apply now")}
          </Button>
        ),
      },
    };
  });
  return { data, campaigns, isLoading: isFetching };
};

export default useCampaigns;
