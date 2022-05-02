import styled from "styled-components";
import { MyRankingTable } from "./MyRankingTable";
import { TopRankingTable } from "./TopRankingTable";
import noLevelBackground from "./assets/noLevelBackground.svg";
import noLevelIcon from "./assets/noLevelIcon.svg";

// TODO Remove
const noLevel = true;

const StyledNoLevel = styled.div`
  .no-level-top-title {
    border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
    height: 3em;
    width: 100%;
    padding: 0.75em 1em;
    color: aq-text-primary;
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

export const RankingTables = () => {
  return (
    <>
      {noLevel ? (
        <StyledNoLevel>
          <div className="no-level-top-title">
            {/* TODO add string key */}
            {"Classifica mensile | Nessun Livello"}
          </div>
          <div className="no-level">
            <img src={noLevelBackground} alt={"No level background"} />
            <div className="no-level-info aq-text-primaryVariant">
              <img
                className="aq-mb-2"
                src={noLevelIcon}
                alt={"No level icon"}
              />
              {/* TODO add string key */}
              “Non sei ancora in classifica: completa l’Entry Test per
              guadagnare i primi punti e raggiungere il livello basic”
            </div>
          </div>
        </StyledNoLevel>
      ) : (
        <>
          <TopRankingTable />
          <MyRankingTable />
        </>
      )}
    </>
  );
};
