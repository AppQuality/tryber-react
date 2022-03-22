import {
  Table,
  Pagination,
  TableType,
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
import { currencyTable } from "src/redux/wallet/utils";
import paypalIcon from "src/pages/Wallet/assets/paypal.svg";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";

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
        results.map((req) => ({
          key: req.id,
          reqId: req.id,
          status: {
            title: req.status,
            content: (
              <div
                className={
                  req.status === "paid" ? "aq-text-success" : "aq-text-warning"
                }
              >
                {req.status}
              </div>
            ),
          },
          paidDate: req.paidDate,
          amount: {
            title: "amount",
            content: (
              <div>
                {req.amount.currency && req.amount.currency in currencyTable
                  ? currencyTable[req.amount.currency]
                  : req.amount.currency}{" "}
                {req.amount.value?.toFixed(2)}
              </div>
            ),
          },
          method: {
            title: req.method?.type || "-",
            content: (
              <>
                <img
                  src={
                    req.method?.type === "paypal"
                      ? paypalIcon
                      : req.method?.type === "iban"
                      ? twIcon
                      : ""
                  }
                  alt={req.method?.type || "method not specified"}
                />{" "}
                {req.method?.note}
              </>
            ),
          },
        }))
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
