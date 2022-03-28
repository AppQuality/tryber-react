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
  setBootyDetailsModalOpen,
  updateDetailsPagination,
} from "../../../redux/wallet/actionCreator";
import { paymentDetailsColumns } from "./columns";

const activityStyle = {
  maxWidth: "calc(100% - 1em)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const BootyDetailsModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columns, setcolumns] = useState<TableType.Column[]>([]);
  const [rows, setRows] = useState<TableType.Row[]>([]);

  const paymentDetails = useSelector(
    (state: GeneralState) => state.wallet.paymentDetails,
    shallowEqual
  );
  const open = useSelector(
    (state: GeneralState) => state.wallet.isBootyDetailsModalOpen,
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
          date: getPaidDate(r.date),
          amount: {
            title: t("Amount"),
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
    if (open) {
      const cols = paymentDetailsColumns(7224, setIsLoading, dispatch, t);
      setcolumns(cols);
      dispatch(fetchPaymentDetails(7224)).then(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      dispatch(resetPaymentDetails());
    }
  }, [open]);

  const changePagination = (newPage: number) => {
    setIsLoading(true);
    const newStart = limit * (newPage - 1);
    dispatch(updateDetailsPagination(7224, newStart)).then(() =>
      setIsLoading(false)
    );
  };

  return (
    <Modal
      title={t("Booty details")}
      isOpen={open}
      onClose={() => dispatch(setBootyDetailsModalOpen(false))}
      size="large"
    >
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
