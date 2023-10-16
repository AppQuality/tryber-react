import {
  icons,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import getCurrencySymbol from "src/utils/getCurrencySymbol";
import styled from "styled-components";
import { Level } from "../Ranking/Level";
import usePerformance from "./effects/usePerformance";
import { GoToBlock, Statistic } from "./performanceRow";

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
  const BootyComponent = ({
    booty,
    i18n,
    ...props
  }: {
    booty: typeof allBooty;
    i18n: { net: string; gross: string };
  }) => {
    if (!booty) return <span>-</span>;
    return (
      <div {...props}>
        {booty.net ? (
          <>
            <strong className="booty" data-qa="net-booty">
              <span className="left">{i18n.net}</span>
              <span className="right">
                {`${getCurrencySymbol(booty.net.currency)}${booty.net.value}`}
              </span>
            </strong>
            <span data-qa="gross-booty">
              ({i18n.gross}{" "}
              {`${getCurrencySymbol(booty.gross.currency)}${booty.gross.value}`}
              )
            </span>
          </>
        ) : (
          <div className="booty" data-qa="gross-booty">
            <strong className="left">{i18n.gross}</strong>
            <strong className="right">
              {`${getCurrencySymbol(booty.gross.currency)}${booty.gross.value}`}
            </strong>
          </div>
        )}
      </div>
    );
  };
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
                    "level {{ level }}:::__CARD_RECAP_DASHBOARD_LABEL_LIVELLO_MAX: 20",
                    {
                      defaultValue: "Level {{ level }}",
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
      booty: (
        <BootyComponent
          i18n={{ net: t("Net received"), gross: t("Gross") }}
          booty={allBooty}
          data-qa="received-booty"
        />
      ),
    },
    {
      icon: (
        <StyledIcon>
          <PiggyBankFill size={"21"} className={"aq-text-successVariant"} />
        </StyledIcon>
      ),
      text: t("Available booty"),
      booty: (
        <BootyComponent
          i18n={{ net: t("Amount to get"), gross: t("Gross") }}
          booty={pendingBooty}
          data-qa="pending-booty"
        />
      ),
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
      {performanceData.map((item, index) => {
        return item.link ? (
          <GoToBlock item={item} key={index} />
        ) : (
          <Statistic item={item} key={index} hasSecondRow={!!item.booty} />
        );
      })}
    </div>
  );
};

export default PerformanceData;
