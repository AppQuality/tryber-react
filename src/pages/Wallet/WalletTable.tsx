import {
  Table,
  Pagination,
  TableType,
  SortTableSelect,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/provider";
import {
  fetchPaymentRequests,
  updatePagination,
} from "src/redux/wallet/actionCreator";
import { walletColumns } from "src/pages/Wallet/columns";
import { shallowEqual, useSelector } from "react-redux";
import { currencyTable, getPaidDate } from "src/redux/wallet/utils";
import paypalIcon from "src/pages/Wallet/assets/paypal.svg";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";
import { initialState } from "src/redux/wallet/reducer";
import pdfIcon from "src/pages/Wallet/assets/pdf.svg";
import detailsIcon from "src/pages/Wallet/assets/details.svg";
import styled from "styled-components";

const ActionsCell = styled.div`
  display: flex;
  .pdf-disabled {
    pointer-events: none;
    cursor: default;
  }
  .action-pdf {
    padding-right: 1em;
    height: 100%;
  }
  .action-details {
    padding-right: 0.5em;
  }
`;

export const WalletTable = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);
  const { requestsList } = useSelector(
    (state: GeneralState) => state.wallet,
    shallowEqual
  );
  const { results, limit, total, start, order, orderBy } = requestsList;
  // initial requests
  useEffect(() => {
    const cols = walletColumns(setIsLoading, dispatch, t);
    setcolumns(cols);
    dispatch(fetchPaymentRequests()).then(() => setIsLoading(false));
  }, []);
  // update datasource for the table
  useEffect(() => {
    if (typeof results !== "undefined") {
      setRows(
        results.map((req) => {
          return {
            key: req.id,
            reqId: req.id,
            status: {
              title: req.status,
              content: (
                <div
                  className={
                    req.status === "paid"
                      ? "aq-text-success"
                      : "aq-text-warning"
                  }
                >
                  {req.status}
                </div>
              ),
            },
            paidDate: getPaidDate(req.paidDate),
            amount: {
              title: "amount",
              content: (
                <span>
                  {req.amount.currency && req.amount.currency in currencyTable
                    ? currencyTable[req.amount.currency]
                    : req.amount.currency}{" "}
                  {req.amount.value?.toFixed(2)}
                </span>
              ),
            },
            method: {
              title: `${req.method?.type} - ${req.method?.note}`,
              content: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      req.method?.type === "paypal"
                        ? paypalIcon
                        : req.method?.type === "iban"
                        ? twIcon
                        : ""
                    }
                    alt={req.method?.type || "method not specified"}
                    className="aq-mr-3"
                    style={{ width: "1em", height: "1em" }}
                  />{" "}
                  <span
                    style={{
                      maxWidth: "calc(100% - 3em)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {req.method?.note}
                  </span>
                </div>
              ),
            },
            actions: {
              title: "",
              content: (
                <ActionsCell>
                  <a
                    className={
                      req.status === "processing" ? "pdf-disabled" : ""
                    }
                    href={req.receipt}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="action-pdf"
                      src={pdfIcon}
                      title={t("__WALLET_TABLE-HEADER_CTA-ICON-PDF MAX:")}
                      alt={t("__WALLET_TABLE-HEADER_CTA-ICON-PDF MAX:")}
                    />
                  </a>
                  <img
                    className="action-details"
                    src={detailsIcon}
                    title={t("__WALLET_TABLE-HEADER_CTA-ICON-DETAILS MAX:")}
                    alt={t("__WALLET_TABLE-HEADER_CTA-ICON-DETAILS MAX:")}
                  />
                </ActionsCell>
              ),
            },
          };
        })
      );
    }
  }, [requestsList]);
  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updatePagination(newStart)).then(() => setIsLoading(false));
  };
  return (
    <>
      <SortTableSelect
        order={order || "DESC"}
        orderBy={orderBy || "paidDate"}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        className="aq-mb-3"
        dataSource={rows}
        columns={columns}
        orderBy={orderBy}
        order={order}
        isLoading={isLoading}
        isStriped
      />
      <Pagination
        className="aq-pt-3"
        onPageChange={changePagination}
        current={start / limit + 1}
        maxPages={Math.ceil(total / limit)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </>
  );
};
