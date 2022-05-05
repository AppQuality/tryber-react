import { Table, TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { RankingColumns } from "../columns";
import starIcon from "../assets/star.svg";
import { shallowEqual, useSelector } from "react-redux";
import { rankingTheme } from "../../rankingTheme";
import { TopTitle } from "../TopTitle";

const StyledTopRanking = styled.div`
  .table-card {
    grid-template-columns: 6px 2em max-content 6em 5em;
  }
  .tbody.cell {
    display: flex;
    align-items: center;
    padding: 8px 8px;
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

export const TopRankingTable = () => {
  const { t } = useTranslation();
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const tops = useSelector(
    (state: GeneralState) => state.ranking.rankings.tops,
    shallowEqual
  );
  const isLoading = useSelector(
    (state: GeneralState) => state.ranking.isLoading,
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
      tops.map((req) => {
        return {
          key: req.id,
          position: req.position,
          image: {
            title: "",
            content: (
              <StyledAvatar>
                <img src={req.image} alt={req.name} />
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
        };
      })
    );
  }, [tops]);

  return (
    <StyledTopRanking>
      <TopTitle
        text={`${t("__RANKING_TITLE_LABEL_TOP_LEVEL_MAX: 25")} ${
          level?.name || ""
        }`}
        background={level?.id ? rankingTheme[level.id].background1 : undefined}
        color={level?.id ? rankingTheme[level.id].textColor : undefined}
        bold
      />
      <Table
        dataSource={rows}
        columns={columns}
        isLoading={isLoading}
        borderedCellColor={level?.id ? rankingTheme[level.id].main : undefined}
        highlightedColor={
          level?.id ? rankingTheme[level.id].background2 : undefined
        }
        mobileAlternative
        i18n={{
          loading: t("...wait"),
          empty: t("no data"),
        }}
      />
    </StyledTopRanking>
  );
};
