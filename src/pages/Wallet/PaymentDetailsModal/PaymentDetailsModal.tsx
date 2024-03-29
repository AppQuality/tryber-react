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
import { updateDetailsPagination } from "src/redux/wallet/actionCreator";
import { closePaymentDetailsModal } from "src/redux/wallet/actions/closePaymentDetailsModal";
import { currencyTable, getPaidDate } from "src/redux/wallet/utils";

import { useGetUsersMePaymentsByPaymentQuery } from "src/services/tryberApi";
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

  const { limit, start, order, orderBy } = paymentDetails;

  const { data, isLoading } = useGetUsersMePaymentsByPaymentQuery({
    payment: (paymentId ? paymentId : 0).toString(),
    limit,
    start,
    order,
    orderBy,
  });

  const { results, total } = data || {};

  useEffect(() => {
    if (typeof results !== "undefined")
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
            gross: {
              title: `€ ` + r.amount.gross?.value,
              content: (
                <Text className="aq-text-success ">
                  <b>
                    {r.amount.gross?.currency || "" in currencyTable
                      ? currencyTable[r.amount.gross?.currency || ""]
                      : r.amount.gross?.currency}{" "}
                    {r.amount.gross?.value?.toFixed(2)}
                  </b>
                </Text>
              ),
            },
          };
        })
      );
  }, [results]);

  useEffect(() => {
    const cols = paymentDetailsColumns(dispatch, t);
    setcolumns(cols);
  }, []);

  const changePagination = (newPage: number) => {
    const newStart = limit * (newPage - 1);
    paymentId && dispatch(updateDetailsPagination(newStart));
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
        maxPages={Math.ceil((total || 0) / limit)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </Modal>
  );
};
