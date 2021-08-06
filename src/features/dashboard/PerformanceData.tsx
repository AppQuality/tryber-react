import { icons } from "@appquality/appquality-design-system";
import usePerformance from "../../store/dashboard/usePerformance";

const PerformanceData = () => {
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
    <div>
      <div style={{ borderBottom: "1px solid #d1e0e8" }} className={"row"}>
        <div>
          <StarFill /> Experience points <strong>{expPoints}</strong>
        </div>
        <div>
          <AwardFill /> Your Rank <strong>{rank}</strong>
        </div>
        <a>
          View ranking page <ArrowRight />
        </a>
      </div>
      <div style={{ borderBottom: "1px solid #d1e0e8" }} className={"row"}>
        <div>
          <BookmarkCheckFill /> Completed campaigns{" "}
          <strong>{cpCompleted}</strong>
        </div>
        <div>
          <BugFill /> Approved bugs <strong>{bugsApproved}</strong>
        </div>
        <a>
          View bugs page <ArrowRight />
        </a>
      </div>
      <div className={"row"}>
        <div>
          <CashCoin /> All-time booty <strong>€ {allBooty}</strong>
        </div>
        <div>
          <PiggyBankFill /> Reserved booty <strong>€ {pendingBooty}</strong>
        </div>
        <a>
          View payments page <ArrowRight />
        </a>
      </div>
    </div>
  );
};

export default PerformanceData;
