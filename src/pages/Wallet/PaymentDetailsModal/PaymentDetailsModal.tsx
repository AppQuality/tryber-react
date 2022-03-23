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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const paymentDetails = useSelector(
    (state: GeneralState) => state.wallet.paymentDetails,
    shallowEqual
  );
  const { results, limit, total, start, order, orderBy } = paymentDetails;

  // TODO REMOVE Example data
  // const results = [
  //     { id: 111, type: 'Testing', amount: { value: 20, currency: 'EUR' }, date: '2020-08-13', activity: '[CP-3140] Prototipi preventivatore A/B UX Study' },
  //     { id: 112, type: 'Community Support', amount: { value: 20, currency: 'EUR' }, date: '2020-05-20', activity: '[CP-3148] Sisal Website' },
  //     { id: 113, type: 'Community Support', amount: { value: 20, currency: 'EUR' }, date: '2020-05-12', activity: '[CP-3096] Bank App No Regression Testbook 12/2020' }
  // ];

  useEffect(() => {
    if (typeof results !== "undefined") {
      setRows(
        results.map((r) => {
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
      const cols = paymentDetailsColumns(setIsLoading, dispatch, t);
      setcolumns(cols);
      // TODO fetch payment detail
    }
  }, [paymentId]);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    // TODO update pagination
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
      <SortTableSelect
        order={order || "DESC"}
        orderBy={orderBy || "paidDate"}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={rows}
        columns={columns}
        orderBy={"date"}
        order={"DESC"}
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
