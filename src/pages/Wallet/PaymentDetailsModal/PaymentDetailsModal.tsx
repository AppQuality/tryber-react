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
import {
  fetchPaymentDetails,
  resetPaymentDetails,
  updateDetailsPagination,
} from "src/redux/wallet/actionCreator";
import { closePaymentDetailsModal } from "src/redux/wallet/actions/closePaymentDetailsModal";
import { currencyTable, getPaidDate } from "src/redux/wallet/utils";

import { paymentDetailsColumns } from "./columns";

const activityStyle = {
  maxWidth: "calc(100% - 1em)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const PaymentDetailsModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const { paymentDetails, isPaymentDetailsModalOpen, paymentId } = useSelector(
    (state: GeneralState) => ({
      paymentDetails: state.wallet.paymentDetails,
      isPaymentDetailsModalOpen: state.wallet.paymentDetailsModal.isOpen,
      paymentId: state.wallet.paymentDetailsModal.paymentId,
    }),
    shallowEqual
  );

  const { results, limit, total, start, order, orderBy } = paymentDetails;

  useEffect(() => {
    setRows(
      results?.map((r) => {
        return {
          key: r.id,
          activity: {
            title: r.activity,
            content: (
              <Text as="div" style={activityStyle}>
                <b className="aq-text-primary">{r.activity}</b>
              </Text>
            ),
          },
          type: {
            title: r.type,
            content: (
              <Text as="span">
                <b className="aq-text-primary">{r.type}</b>
              </Text>
            ),
          },
          date: getPaidDate(r.date),
          amount: {
            title: `€ ` + r.amount.value,
            content: (
              <Text className="aq-text-success ">
                <b>
                  {r.amount.currency in currencyTable
                    ? currencyTable[r.amount.currency]
                    : r.amount.currency}{" "}
                  {r.amount.value?.toFixed(2)}
                </b>
              </Text>
            ),
          },
        };
      })
    );
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
      isOpen={isPaymentDetailsModalOpen}
      onClose={() => dispatch(closePaymentDetailsModal())}
      size="large"
    >
      <Text className="aq-mt-3 aq-mb-3">
        <strong>{`${t("Payment Request ID")}${paymentId}`}</strong>
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
