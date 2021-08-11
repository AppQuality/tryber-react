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
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }
  return (
    <>
      <div className={"aq-mb-3"}>
        <BSGrid>
          <BSCol size={"col-2"}>
            <StarFill size={"21"} className={"aq-text-warning"} />
          </BSCol>
          <BSCol size={"col-7"}>
            <Text>{t("Experience Points")}</Text>
          </BSCol>
          <BSCol size={"col-3"}>
            <Text className={"aq-text-right"}>
              <strong>{expPoints}</strong>
            </Text>
          </BSCol>
        </BSGrid>
      </div>
      <div className={"aq-mb-3"}>
        <BSGrid>
          <BSCol size={"col-2"}>
            <AwardFill size={"21"} className={"aq-text-info"} />
          </BSCol>
          <BSCol size={"col-7"}>
            <Text>{t("Your Rank")}</Text>
          </BSCol>
          <BSCol size={"col-3"}>
            <Text className={"aq-text-right"}>
              <strong>{rank}</strong>
            </Text>
          </BSCol>
        </BSGrid>
      </div>
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

      <div className={"aq-mb-3"}>
        <BSGrid>
          <BSCol size={"col-2"}>
            <BookmarkCheckFill size={"21"} className={"aq-text-secondary"} />
          </BSCol>
          <BSCol size={"col-7"}>
            <Text>{t("Completed campaigns")}</Text>
          </BSCol>
          <BSCol size={"col-3"}>
            <Text className={"aq-text-right"}>
              <strong>{cpCompleted}</strong>
            </Text>
          </BSCol>
        </BSGrid>
      </div>
      <div className={"aq-mb-3"}>
        <BSGrid>
          <BSCol size={"col-2"}>
            <BugFill size={"21"} className={"aq-text-danger"} />
          </BSCol>
          <BSCol size={"col-7"}>
            <Text>{t("Approved bugs")}</Text>
          </BSCol>
          <BSCol size={"col-3"}>
            <Text className={"aq-text-right"}>
              <strong>{bugsApproved}</strong>
            </Text>
          </BSCol>
        </BSGrid>
      </div>
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

      <div className={"aq-mb-3"}>
        <BSGrid>
          <BSCol size={"col-2"}>
            <CashCoin size={"21"} className={"aq-text-success"} />
          </BSCol>
          <BSCol size={"col-6"}>
            <Text>{t("Recived booty")}</Text>
          </BSCol>
          <BSCol size={"col-4"}>
            <Text className={"aq-text-right"}>
              <strong>€ {allBooty}</strong>
            </Text>
          </BSCol>
        </BSGrid>
      </div>
      <div className={"aq-mb-3"}>
        <BSGrid>
          <BSCol size={"col-2"}>
            <StyledIcon>
              <PiggyBankFill size={"21"} className={"dark-disabled-font"} />
            </StyledIcon>
          </BSCol>
          <BSCol size={"col-6"}>
            <Text>{t("Available booty")}</Text>
          </BSCol>
          <BSCol size={"col-4"}>
            <Text className={"aq-text-right"}>
              <strong>€ {pendingBooty}</strong>
            </Text>
          </BSCol>
        </BSGrid>
      </div>
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
