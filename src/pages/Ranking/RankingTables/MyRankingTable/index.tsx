import { Table, TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { RankingColumns } from "../columns";
import starIcon from "src/pages/Ranking/assets/star.svg";
import { shallowEqual, useSelector } from "react-redux";
import getGravatarUrlWithColoredFallbackInitials from "../../../../utils/getGravatarUrlWithThemedFallbackInitials";
import { rankingTheme } from "../../rankingTheme";

const StyledMyRanking = styled.div`
  .table-card {
    grid-template-columns: 6px 2em max-content 6em 5em;
  }
  .tbody.cell {
    display: flex;
    align-items: center;
    padding: 8px 8px;
  }
  .ranking-top-title {
    border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
    min-height: 3em;
    width: 100%;
    padding: 0.75em 1em;
    background: ${(p) => p.theme.colors.gray50};
    color: ${(p) => p.theme.colors.gray700};
  }
`;

const StyledAvatar = styled.div`
  display: flex;
  img {
    width: 33px;
    height: 33px;
    border-radius: 50%;
  }
`;

const StyledExp = styled.div`
  display: flex;
  align-items: center;
  .monthly-exp {
    margin-left: 1.5em;
  }
  @media (max-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    .monthly-exp {
      margin-left: 1em;
    }
  }
`;

export const MyRankingTable = () => {
  const { t } = useTranslation();
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const peers = useSelector(
    (state: GeneralState) => state.ranking.rankings.peers,
    shallowEqual
  );
  const isLoading = useSelector(
    (state: GeneralState) => state.ranking.isLoading,
    shallowEqual
  );

  const userId = useSelector(
    (state: GeneralState) => state.user.user.id,
    shallowEqual
  );

  const level = useSelector(
    (state: GeneralState) => state.ranking.summary?.level,
    shallowEqual
  );

  // initial requests
  useEffect(() => {
    const cols = RankingColumns(t);
    setcolumns(cols);
  }, []);

  // update datasource for the table
  useEffect(() => {
    setRows(
      peers.map((req) => {
        return {
          key: req.id,
          position: req.position,
          image: {
            title: "",
            content: (
              <StyledAvatar>
                <img
                  src={
                    req.id === userId && level?.id
                      ? getGravatarUrlWithColoredFallbackInitials(
                          req.image,
                          rankingTheme[level.id].main
                        )
                      : req.image
                  }
                  alt={req.name}
                />
              </StyledAvatar>
            ),
          },
          id: req.id,
          name: req.name,
          exp: {
            title: req.monthly_exp.toString(),
            content: (
              <StyledExp>
                <img src={starIcon} alt={req.monthly_exp.toString()} />
                <div className="monthly-exp">{req.monthly_exp}</div>
              </StyledExp>
            ),
          },
          highlighted: req.id === userId,
        };
      })
    );
  }, [peers]);

  return (
    <StyledMyRanking>
      <div className="ranking-top-title">
        {`${t("__RANKING_TITLE_LABEL_MONTH_MAX: 45")} ${level?.name || ""}`}
      </div>
      <Table
        dataSource={rows}
        columns={columns}
        isLoading={isLoading}
        borderedCellColor={level?.id ? rankingTheme[level.id].main : undefined}
        highlightedColor={
          level?.id ? rankingTheme[level.id].background2 : undefined
        }
        mobileAlternative
        hideHeader
        i18n={{
          loading: t("...wait"),
          empty: t("no data"),
        }}
      />
    </StyledMyRanking>
  );
};
