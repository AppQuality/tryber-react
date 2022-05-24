import styled from "styled-components";
import { MyRankingTable } from "./MyRankingTable";
import { TopRankingTable } from "./TopRankingTable";
import noLevelBackground from "./assets/noLevelBackground.svg";
import noLevelIcon from "./assets/noLevelIcon.svg";
import { useAppDispatch } from "src/redux/provider";
import { fetchRankings } from "src/redux/ranking/actionCreator";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import localizedUrl from "../../../utils/localizedUrl";
import { shallowEqual, useSelector } from "react-redux";
import { TopTitle } from "./TopTitle";

const StyledRankingTables = styled.div`
  margin-top: 2em;

  .no-level {
    text-align: center;
    margin: 4em 0 6em;
    position: relative;

    .no-level-info {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 20em;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .no-level-link {
        font-weight: ${(props) => props.theme.typography.fontWeight.medium};
        color: ${(props) => props.theme.variants.primary};
      }
    }
  }
`;

export const RankingTables = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const level = useSelector(
    (state: GeneralState) => state.ranking.summary?.level,
    shallowEqual
  );

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
      {level?.id === 0 ? (
        <div className="no-level">
          <img src={noLevelBackground} alt={"No level background"} />
          <div className="no-level-info aq-text-primaryVariant">
            <img className="aq-mb-2" src={noLevelIcon} alt={"No level icon"} />
            <Trans
              i18nKey={
                "Available tags : <entry_test_link> (Link to entry test):::__RANKING_MODAL_MESSAGE_MAX: 250"
              }
              components={{
                entry_test_link: (
                  <a
                    className="no-level-link"
                    href={localizedUrl(`/courses/16`)}
                  />
                ),
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <TopTitle
            text={t(
              "Monthly ranking | level {{level}}:::__RANKING_MAIN-TITLE_LABEL_MONTH_OTHER_MAX: 45",
              { level: level?.name }
            )}
            bold
          />
          <TopRankingTable />
          <MyRankingTable />
        </>
      )}
    </StyledRankingTables>
  );
};
