import {
  aqBootstrapTheme,
  Table,
  TableType,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import starIcon from "src/pages/Ranking/assets/star.svg";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import getGravatarUrlWithColoredFallbackInitials from "../../../../utils/getGravatarUrlWithThemedFallbackInitials";
import { rankingTheme } from "../../rankingTheme";
import { RankingColumns } from "../columns";
import { StyledAvatar, StyledExp, StyledRanking } from "../style";
import { TopTitle } from "../TopTitle";

export const MyRankingTable = () => {
  const { t } = useTranslation();
  const { data: user } = useGetUsersMeQuery({});
  const [columns] = useState<TableType.Column[]>(RankingColumns(t));
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const peers = useSelector(
    (state: GeneralState) => state.ranking.rankings.peers,
    shallowEqual
  );
  const isLoading = useSelector(
    (state: GeneralState) => state.ranking.isLoading,
    shallowEqual
  );

  const userId = user ? user.id : undefined;

  const level = useSelector(
    (state: GeneralState) => state.ranking.summary?.level,
    shallowEqual
  );

  // update datasource for the table
  useEffect(() => {
    setRows(
      peers.map((req) => {
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
          highlighted: req.id === userId,
        };
      })
    );
  }, [peers, level?.id, userId]);

  return (
    <StyledRanking>
      <TopTitle
        text={t(
          "Overall ranking | level {{level}}:::__RANKING_TITLE_LABEL_MONTH_MAX: 45",
          { level: level?.name }
        )}
        background={aqBootstrapTheme.colors.gray50}
        color={aqBootstrapTheme.colors.gray700}
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
        hideHeader
        i18n={{
          loading: t("...wait"),
          empty: t("no data"),
        }}
      />
    </StyledRanking>
  );
};
