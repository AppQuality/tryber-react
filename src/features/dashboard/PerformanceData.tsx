import { icons } from "@appquality/appquality-design-system";
import usePerformance from "../../store/dashboard/usePerformance";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledPerformance = styled.div`
  .stats {
    border-bottom: 1px solid #d1e0e8;
  }
  .stats-row {
    display: grid;
    grid-template-columns: 21px 1fr 75px;
  }
  .stats-go-to {
    display: grid;
    grid-template-columns: 190px 21px;
  }
  .warning {
    color: #ff9900;
  }
  .danger {
    color: #d71116;
  }
  .success {
    color: #3ead52;
  }
  .info {
    color: #266a9a;
  }
  .primary {
    color: #17405c;
  }
  .secondary {
    color: #448098;
  }
  .icon {
    width: 21px;
    height: 21px;
  }
  .disabled-font {
    color: #8ea2ae;
  }
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
    return <div>LOADING CAZZO! ASPETTA!</div>;
  }
  return (
    <StyledPerformance>
      <div className={"stats"}>
        <div className={"stats-row"}>
          <StarFill className={"icon warning"} /> {t("Experience points")}{" "}
          <strong>{expPoints}</strong>
        </div>
        <div className={"stats-row"}>
          <AwardFill className={"icon info"} /> {t("Your Rank")}{" "}
          <strong>{rank}</strong>
        </div>
        <a>
          {t("View ranking page")} <ArrowRight className={"icon"} />
        </a>
      </div>
      <div className={"stats"}>
        <div className={"stats-row"}>
          <BookmarkCheckFill className={"icon secondary"} />{" "}
          {t("Completed campaigns")} <strong>{cpCompleted}</strong>
        </div>
        <div className={"stats-row"}>
          <BugFill className={"icon danger"} /> {t("Approved bugs")}{" "}
          <strong>{bugsApproved}</strong>
        </div>
        <a>
          {t("View bugs page")} <ArrowRight className={"icon"} />
        </a>
      </div>
      <div className={"stats-no-border"}>
        <div className={"stats-row"}>
          <CashCoin className={"icon success"} /> {t("All-time booty")}{" "}
          <strong>€ {allBooty}</strong>
        </div>
        <div className={"stats-row"}>
          <PiggyBankFill className={"icon disabled-font"} />{" "}
          {t("Reserved booty")} <strong>€ {pendingBooty}</strong>
        </div>
        <a className={"stats-go-to"}>
          {t("View payments page")} <ArrowRight className={"icon"} />
        </a>
      </div>
    </StyledPerformance>
  );
};

export default PerformanceData;
