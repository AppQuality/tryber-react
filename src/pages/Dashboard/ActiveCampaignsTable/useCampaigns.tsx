import { Button, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import getTranslatableLink from "src/features/getTranslatableLink";
import DashboardHelpStore from "src/redux/dashboardHelpModal";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";

const useCampaigns = ({ page, order, orderBy }: CampaignsTableProps) => {
  const { t, i18n } = useTranslation();
  const { open } = DashboardHelpStore();

  const limit = 10;
  const { data, isFetching } = useGetUsersMeCampaignsQuery({
    start: (page - 1) * limit,
    limit: limit,
    filterBy: {
      accepted: "1",
      completed: "0",
    },
    order: order,
    orderBy: orderBy,
  });

  const campaigns = data?.results?.map((cp) => {
    const manualLink = getTranslatableLink(cp.manual_link, i18n.language);

    return {
      key: cp.id ? cp.id : 123,
      campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
      startDate: dateFormatter(cp.dates.start),
      endDate: dateFormatter(cp.dates.end),
      actions: {
        title: ``,
        content:
          manualLink === "#" ? (
            <ManualNotReady />
          ) : (
            <ManualButton href={`${window.location.origin}${manualLink}`} />
          ),
      },
    };

    function ManualNotReady() {
      return (
        <>
          <Text as="span" className="aq-text-disabled-dark" small>
            <b>{t("Coming soon")}</b>
          </Text>{" "}
          <Text as="span" small>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            >
              (?)
            </a>
          </Text>
        </>
      );
    }
    function ManualButton({ href }: { href: string }) {
      return (
        <>
          <Button
            className="aq-nopadding"
            forwardedAs="a"
            href={href}
            kind="link-hover"
            size="sm"
          >
            {t("Read manual")}
          </Button>
        </>
      );
    }
  });
  return { data, campaigns, isLoading: isFetching };
};

export default useCampaigns;
