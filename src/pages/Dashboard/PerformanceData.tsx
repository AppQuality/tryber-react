import {
  icons,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import styled from "styled-components";
import { Level } from "../Ranking/Level";
import usePerformance from "./effects/usePerformance";
import { BootyStatistic, GoToBlock, Statistic } from "./performanceRow";
import getCurrencySymbol from "src/utils/getCurrencySymbol";

const StyledIcon = styled.div`
  .dark-disabled-font {
    color: ${(props) => props.theme.colors.disabledDark};
  }
`;

const PerformanceData = () => {
  const { t } = useTranslation();
  const {
    BookmarkCheckFill,
    BugFill,
    PiggyBankFill,
    StarFill,
    CashCoin,
    ArrowRight,
    Star,
  } = icons;
  const {
    expPoints,
    cpCompleted,
    bugsApproved,
    allBooty,
    pendingBooty,
    loading,
  } = usePerformance();

  const { summary } = useSelector(
    (state: GeneralState) => state.ranking,
    shallowEqual
  );
  const bootyDataNet = allBooty
    ? allBooty.net
      ? `${getCurrencySymbol(allBooty.net.currency)}${allBooty.net.value}`
      : `${getCurrencySymbol(allBooty.gross.currency)}${allBooty.gross.value}`
    : undefined;

  const pendingBootyDataNet = pendingBooty
    ? pendingBooty.net
      ? `${getCurrencySymbol(pendingBooty.net.currency)}${
          pendingBooty.net.value
        }`
      : `${getCurrencySymbol(pendingBooty.gross.currency)}${
          pendingBooty.gross.value
        }`
    : undefined;
  const bootyDataGross =
    allBooty && allBooty.net
      ? `${getCurrencySymbol(allBooty.gross.currency)}${allBooty.gross.value}`
      : undefined;
  const pendingBootyDataGross =
    pendingBooty && pendingBooty.net
      ? `${getCurrencySymbol(pendingBooty.gross.currency)}${
          pendingBooty.gross.value
        }`
      : undefined;
  const performanceData = [
    {
      icon: <StarFill size={"21"} className={"aq-text-warningVariant"} />,
      text: t("__CARD_RECAP_DASHBOARD_LABEL_PUNTI-TOTALI_MAX: 25", {
        defaultValue: "Total exp points",
      }),
      val: expPoints,
    },
    {
      icon: <Star size={"21"} className={"aq-text-primaryVariant"} />,
      text: t("__CARD_RECAP_DASHBOARD_LABEL_PUNTI-MENSILI_MAX: 25", {
        defaultValue: "Monthly exp points",
      }),
      val: summary?.points || 0,
    },
    ...(summary?.level
      ? [
          {
            icon: <Level level={summary?.level} hideName />,
            text:
              summary.level.id === 0
                ? summary.level.name
                : t(
                    "level {{level}}:::__CARD_RECAP_DASHBOARD_LABEL_LIVELLO_MAX: 20",
                    {
                      defaultValue: "Level {{level}}",
                      level: summary?.level.name,
                    }
                  ),
            val: summary.level.id === 0 ? "" : `${summary.rank}°`,
          },
        ]
      : []),
    {
      icon: <ArrowRight size={"21"} />,
      text: t("__CARD_RECAP_DASHBOARD_CTA_MAX: 30", {
        defaultValue: "View ranking page",
      }),
      link: `/${
        i18n.language === "en"
          ? "leaderboard"
          : i18n.language === "it"
          ? "it/leaderboard-2/"
          : "es/tabla-de-classificacion/"
      }`,
    },
    {
      icon: (
        <BookmarkCheckFill size={"21"} className={"aq-text-secondaryVariant"} />
      ),
      text: t("Completed campaigns"),
      val: cpCompleted,
    },
    {
      icon: <BugFill size={"21"} className={"aq-text-dangerVariant"} />,
      text: t("Approved bugs"),
      val: bugsApproved,
    },
    {
      icon: <ArrowRight size={"21"} />,
      text: t("View bugs page"),
      link: `${useLocalizeRoute("my-bugs")}`,
    },
    {
      icon: <CashCoin size={"21"} className={"aq-text-success"} />,
      text: t("Received booty"),
      net: (
        <div className="booty">
          <p>{t("Net received")}</p> {bootyDataNet}
        </div>
      ),
      gross: bootyDataGross ? `${t("Gross")} ${bootyDataGross}` : null,
      booty: true,
    },
    {
      icon: (
        <StyledIcon>
          <PiggyBankFill size={"21"} className={"aq-text-successVariant"} />
        </StyledIcon>
      ),
      text: t("Available booty"),
      net: (
        <div className="booty">
          <p>{t("Amount to get")}</p> {pendingBootyDataNet}
        </div>
      ),
      gross: pendingBootyDataGross
        ? `${t("Gross")} ${pendingBootyDataGross}`
        : null,
    },
    {
      icon: <ArrowRight size={"21"} />,
      text: t("View payments page"),
      link: `${window.location.origin}/${
        i18n.language === "en"
          ? "payments"
          : i18n.language === "it"
          ? "it/pagamenti/"
          : "es/pagos"
      }`,
    },
  ];

  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }
  return (
    <div>
      {performanceData.map((item, index) =>
        item.link ? (
          <GoToBlock item={item} key={index} />
        ) : item.net ? (
          <BootyStatistic item={item} key={index} />
        ) : (
          <Statistic item={item} key={index} />
        )
      )}
    </div>
  );
};

export default PerformanceData;
