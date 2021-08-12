import {
  icons,
  BSGrid,
  BSCol,
  Text,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import usePerformance from "../../store/dashboard/usePerformance";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const GoToBlock = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.disabled};
`;
const StyledIcon = styled.div`
  .dark-disabled-font {
    color: ${(props) => props.theme.colors.disabledDark};
  }
`;
const StyledAnchor = styled.a`
  text-decoration: none;
`;

const PerformanceRow = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr 70px;
  grid-gap: 16px;
`;

const PerformanceData = () => {
  const { t } = useTranslation();
  const {
    AwardFill,
    BookmarkCheckFill,
    BugFill,
    PiggyBankFill,
    StarFill,
    CashCoin,
    ArrowRight,
  } = icons;
  const {
    expPoints,
    rank,
    cpCompleted,
    bugsApproved,
    allBooty,
    pendingBooty,
    loading,
  } = usePerformance();
  const rankingData = [
    {
      icon: <StarFill size={"21"} className={"aq-text-warning"} />,
      text: t("Experience Points"),
      apiVal: expPoints,
    },
    {
      icon: <AwardFill size={"21"} className={"aq-text-info"} />,
      text: t("Your Rank"),
      apiVal: rank,
    },
  ];
  const bugData = [
    {
      icon: <BookmarkCheckFill size={"21"} className={"aq-text-secondary"} />,
      text: t("Completed campaigns"),
      apiVal: cpCompleted,
    },
    {
      icon: <BugFill size={"21"} className={"aq-text-danger"} />,
      text: t("Approved bugs"),
      apiVal: bugsApproved,
    },
  ];
  const bootyData = [
    {
      icon: <CashCoin size={"21"} className={"aq-text-success"} />,
      text: t("Recieved booty"),
      apiVal: allBooty + "€",
    },
    {
      icon: (
        <StyledIcon>
          <PiggyBankFill size={"21"} className={"dark-disabled-font"} />
        </StyledIcon>
      ),
      text: t("Available booty"),
      apiVal: pendingBooty + "€",
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
    <>
      {rankingData.map((item, index) => (
        <PerformanceRow className="aq-mb-3" key={index}>
          <div>{item.icon}</div>
          <Text>{item.text}</Text>
          <Text className={"aq-text-right"}>
            <strong>{item.apiVal}</strong>
          </Text>
        </PerformanceRow>
      ))}
      <GoToBlock className={"aq-mb-3 aq-pb-3"}>
        <StyledAnchor
          href={`${window.location.origin}/${
            i18n.language !== "en" ? "it/leaderboard-2/" : "leaderboard"
          }`}
        >
          <BSGrid>
            <BSCol size={"col-9"}>
              <span className={"aq-text-info"}>{t("View ranking page")}</span>
            </BSCol>
            <BSCol size={"col-3"}>
              <ArrowRight className={"aq-float-right"} size={"21"} />
            </BSCol>
          </BSGrid>
        </StyledAnchor>
      </GoToBlock>

      {bugData.map((item, index) => (
        <PerformanceRow className="aq-mb-3" key={index}>
          <div>{item.icon}</div>
          <Text>{item.text}</Text>
          <Text className={"aq-text-right"}>
            <strong>{item.apiVal}</strong>
          </Text>
        </PerformanceRow>
      ))}

      <GoToBlock className={"aq-mb-3 aq-pb-3"}>
        <StyledAnchor
          href={`${window.location.origin}/${
            i18n.language !== "en" ? "it/" : ""
          }my-bugs/`}
        >
          <BSGrid>
            <BSCol size={"col-9"}>
              <span className={"aq-text-info"}>{t("View bugs page")}</span>
            </BSCol>
            <BSCol size={"col-3"}>
              <ArrowRight className={"aq-float-right"} size={"21"} />
            </BSCol>
          </BSGrid>
        </StyledAnchor>
      </GoToBlock>

      {bootyData.map((item, index) => (
        <PerformanceRow className="aq-mb-3" key={index}>
          <div>{item.icon}</div>
          <Text>{item.text}</Text>
          <Text className={"aq-text-right"}>
            <strong>{item.apiVal}</strong>
          </Text>
        </PerformanceRow>
      ))}

      <div className={"aq-mb-3"}>
        <StyledAnchor
          href={`${window.location.origin}/${
            i18n.language !== "en" ? "it/pagamenti/" : "payments/"
          }`}
        >
          <BSGrid>
            <BSCol size={"col-9"}>
              <span className={"aq-text-info"}>{t("View payments page")}</span>
            </BSCol>
            <BSCol size={"col-3"}>
              <ArrowRight className={"aq-float-right"} size={"21"} />
            </BSCol>
          </BSGrid>
        </StyledAnchor>
      </div>
    </>
  );
};

export default PerformanceData;
