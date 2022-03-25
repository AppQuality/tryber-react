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
import pdfIcon from "src/pages/Wallet/assets/pdf.svg";
import detailsIcon from "src/pages/Wallet/assets/details.svg";
import pdfHoverIcon from "src/pages/Wallet/assets/pdfHover.svg";
import detailsHoverIcon from "src/pages/Wallet/assets/detailsHover.svg";
import styled from "styled-components";
import { PaymentDetailsModal } from "./PaymentDetailsModal/PaymentDetailsModal";

const ActionsCell = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    flex-direction: column;
    align-items: flex-end;

    .action-pdf {
      margin-right: 0.5em;
      margin-bottom: 1em;
    }
    .action-details {
      margin-right: 0.5em;
    }
  }
  .pdf-disabled {
    pointer-events: none;
    cursor: default;
  }
  .action-pdf {
    width: 21px;
    height: 21px;
    background: url(${pdfIcon}) no-repeat;

    &:hover {
      background: url(${pdfHoverIcon}) no-repeat;
    }
  }
  .action-details {
    cursor: pointer;
    width: 21px;
    height: 21px;
    background: url(${detailsIcon}) no-repeat;
    margin-right: 0.5em;

    &:hover {
      background: url(${detailsHoverIcon}) no-repeat;
    }
  }
`;

const StyledIcon = styled.img`
  width: 1em;
  height: 1em;
  vertical-align: text-top;
  display: inline-block;
`;
const MethodStyle = styled.span`
  max-width: calc(
    100% - 36px
  ); // 36 totally magic number, where does it came from?
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    max-width: 30ch;
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.xl}) {
    max-width: 38ch;
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.xxl}) {
    max-width: 50ch;
  }
`;
export const WalletTable = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<number | undefined>();

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
              title: req.status === "paid" ? t("Paid") : t("Processing"),
              content: (
                <div
                  className={
                    req.status === "paid"
                      ? "aq-text-success"
                      : "aq-text-warning"
                  }
                >
                  {req.status === "paid" ? t("Paid") : t("Processing")}
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
                <>
                  <StyledIcon
                    src={
                      req.method?.type === "paypal"
                        ? paypalIcon
                        : req.method?.type === "iban"
                        ? twIcon
                        : ""
                    }
                    alt={req.method?.type || "method not specified"}
                    className="aq-mr-2"
                  />{" "}
                  <MethodStyle>{req.method?.note}</MethodStyle>
                </>
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
                    <div
                      className="action-pdf"
                      title={t("__WALLET_TABLE-HEADER_CTA-ICON-PDF MAX:")}
                    />
                  </a>
                  <div
                    className="action-details"
                    title={t("__WALLET_TABLE-HEADER_CTA-ICON-DETAILS MAX:")}
                    onClick={() => {
                      setPaymentId(req.id);
                      setOpenDetails(true);
                    }}
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
      {columns.length > 0 && (
        <SortTableSelect
          order={order}
          orderBy={orderBy}
          columns={columns}
          label={t("Order By", { context: "Sort Table Select" })}
        />
      )}
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
      <PaymentDetailsModal
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
          setPaymentId(undefined);
        }}
        paymentId={paymentId}
      />
    </>
  );
};
