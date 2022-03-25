import {
  Modal,
  Pagination,
  SortTableSelect,
  Table,
  TableType,
  Text,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import { currencyTable, getPaidDate } from "src/redux/wallet/utils";
import {
  fetchPaymentDetails,
  resetPaymentDetails,
  updateDetailsPagination,
} from "../../../redux/wallet/actionCreator";
import { paymentDetailsColumns } from "./columns";

interface PaymentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  paymentId?: number;
}

export const PaymentDetailsModal = ({
  open,
  onClose,
  paymentId,
}: PaymentDetailsModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const paymentDetails = useSelector(
    (state: GeneralState) => state.wallet.paymentDetails,
    shallowEqual
  );
  const { results, limit, total, start, order, orderBy } = paymentDetails;

  useEffect(() => {
    if (typeof results !== "undefined") {
      setRows(
        results?.map((r) => {
          return {
            key: r.id,
            activity: {
              title: r.activity,
              content: (
                <div
                  style={{
                    maxWidth: "calc(100% - 1em)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {r.activity}
                </div>
              ),
            },
            type: r.type,
            date: getPaidDate(r.date),
            amount: {
              title: t("Amount"),
              content: (
                <span className="aq-text-success">
                  {r.amount.currency && r.amount.currency in currencyTable
                    ? currencyTable[r.amount.currency]
                    : r.amount.currency}{" "}
                  {r.amount.value?.toFixed(2)}
                </span>
              ),
            },
          };
        })
      );
    }
  }, [paymentDetails]);

  useEffect(() => {
    if (paymentId) {
      const cols = paymentDetailsColumns(paymentId, setIsLoading, dispatch, t);
      setcolumns(cols);
      dispatch(fetchPaymentDetails(paymentId)).then(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      dispatch(resetPaymentDetails());
    }
  }, [paymentId]);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    paymentId &&
      dispatch(updateDetailsPagination(paymentId, newStart)).then(() =>
        setIsLoading(false)
      );
  };

  return (
    <Modal
      title={t("Payment details")}
      isOpen={open}
      onClose={onClose}
      size="large"
    >
      <Text className="aq-mt-3 aq-mb-3">
        <strong>{`${t("Payment Request ID")} #${paymentId}`}</strong>
      </Text>
      {columns.length > 0 && (
        <SortTableSelect
          order={order}
          orderBy={orderBy}
          columns={columns}
          label={t("Order By", { context: "Sort Table Select" })}
        />
      )}
      <Table
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
    </Modal>
  );
};
