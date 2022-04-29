import { Table, TableType } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { RankingColumns } from "../columns";
import starIcon from "../assets/star.svg";

// TODO Remove
const tops = [
  {
    position: 1,
    image:
      "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
    id: "T0090",
    name: "aaaaa",
    monthly_exp: 80,
  },
  {
    position: 2,
    image:
      "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
    id: "T8090",
    name: "bbbbb",
    monthly_exp: 70,
  },
  {
    position: 3,
    image:
      "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
    id: "T2780",
    name: "ccccc",
    monthly_exp: 60,
  },
];

const StyledTopRanking = styled.div`
  .tbody.cell {
    display: flex;
    align-items: center;
    padding: 8px 8px;
  }
  .ranking-top-title {
    border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
    height: 3em;
    width: 100%;
    padding: 0.75em 1em;
    background: #fbf1f3;
    color: #b23a5d;
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
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
`;

export const TopRankingTable = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  useEffect(() => {
    const cols = RankingColumns(t);
    setcolumns(cols);
  }, []);

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
  }, []);

  return (
    <StyledTopRanking>
      <div className="ranking-top-title">
        {/* TODO Aggiungere livello attuale */}
        {t("__RANKING_TITLE_LABEL_TOP_LEVEL_MAX:")}
      </div>
      <Table
        className="aq-mb-3"
        dataSource={rows}
        columns={columns}
        isLoading={isLoading}
        mobileAlternative
        // TODO Agganciare colori del tema in base al livello
        borderedCellColor="#D57287"
        highlightedColor="#EEC7CF"
        i18n={{
          loading: t("...wait"),
          empty: "no data",
        }}
      />
    </StyledTopRanking>
  );
};
