import { Table, TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RankingColumns } from "../columns";
import starIcon from "src/pages/Ranking/assets/star.svg";
import { shallowEqual, useSelector } from "react-redux";
import { rankingTheme } from "../../rankingTheme";
import { TopTitle } from "../TopTitle";
import { StyledAvatar, StyledExp, StyledRanking } from "../style";

export const TopRankingTable = () => {
  const { t } = useTranslation();
  const [columns, setcolumns] = useState<TableType.Column[]>(RankingColumns(t));
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

  // update datasource for the table
  useEffect(() => {
    setRows(
      tops.map((req) => {
        return {
          key: req.id,
          position: {
            title: req.position.toString(),
            content: <div className="ranking-position">{req.position}</div>,
          },
          image: {
            title: "",
            content: (
              <StyledAvatar>
                <img src={req.image} alt={req.name} />
              </StyledAvatar>
            ),
          },
          id: `T${req.id}`,
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
    <StyledRanking>
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
    </StyledRanking>
  );
};
