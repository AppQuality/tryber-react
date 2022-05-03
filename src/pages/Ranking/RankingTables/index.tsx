import styled from "styled-components";
import { MyRankingTable } from "./MyRankingTable";
import { TopRankingTable } from "./TopRankingTable";
import noLevelBackground from "./assets/noLevelBackground.svg";
import noLevelIcon from "./assets/noLevelIcon.svg";
import { useAppDispatch } from "../../../redux/provider";
import { fetchRankings } from "../../../redux/ranking/actionCreator";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const StyledRankingTables = styled.div`
  .top-title {
    border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
    height: 3em;
    width: 100%;
    padding: 0.75em 1em;
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  }

  .no-level {
    text-align: center;
    margin: 4em 0;
    position: relative;
    .no-level-info {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 20em;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

// TODO Remove
const levelId = 0;

export const RankingTables = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchRankings()).then(() =>
      dispatch({
        type: "ranking/setIsLoading",
        payload: false,
      })
    );
  }, []);

  return (
    <StyledRankingTables>
      <div className="top-title">
        {/* TODO add level */}
        {!levelId
          ? t("__RANKING_MAIN-TITLE_LABEL_MONTH_NO-LEVEL_MAX: 45")
          : t("__RANKING_MAIN-TITLE_LABEL_MONTH_OTHER_MAX: 45")}
      </div>
      {!levelId ? (
        <div className="no-level">
          <img src={noLevelBackground} alt={"No level background"} />
          <div className="no-level-info aq-text-primaryVariant">
            <img className="aq-mb-2" src={noLevelIcon} alt={"No level icon"} />
            {t("__RANKING_MODAL_MESSAGE_MAX: 100")}
          </div>
        </div>
      ) : (
        <>
          <TopRankingTable />
          <MyRankingTable />
        </>
      )}
    </StyledRankingTables>
  );
};
