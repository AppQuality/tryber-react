type WalletState = {
  requestsList: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: "amount" | "paidDate";
  };
  booty: {
    amount: number;
    bootyThreshold?: {
      value: number;
      isOver: boolean;
    };
  };
  isPaymentModalOpen: boolean;
  paymentDetails: ApiOperations["get-users-me-payments-payment"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: "date" | "type" | "activity" | "amount";
  };
};

type WalletActions =
  | WalletActions_UpdateRequestList
  | WalletActions_UpdateRequestQuery
  | WalletActions_SetBooty
  | WalletActions_TogglePaymentModal
  | WalletActions_UpdatePaymentDetails
  | WalletActions_UpdatePaymentDetailsQuery
  | WalletActions_ResetPaymentDetails;

/**
 *  Action types and their payloads
 */
type WalletActions_UpdateRequestList = {
  type: "wallet/updateRequestsList";
  payload: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"];
};

type WalletActions_SetBooty = {
  type: "wallet/setBooty";
  payload: ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"];
};

type WalletActions_UpdateRequestQuery = {
  type: "wallet/updateReqsQuery";
  payload: ApiOperations["get-users-me-payments"]["parameters"]["query"];
};

type WalletActions_TogglePaymentModal = {
  type: "wallet/togglePaymentModal";
  payload: boolean;
};

type WalletActions_UpdatePaymentDetails = {
  type: "wallet/updatePaymentDetails";
  payload: ApiOperations["get-users-me-payments-payment"]["responses"]["200"]["content"]["application/json"];
};

type WalletActions_UpdatePaymentDetailsQuery = {
  type: "wallet/updatePaymentDetailsQuery";
  payload: ApiOperationsApiOperations["get-users-me-payments-payment"]["parameters"]["query"];
};

type WalletActions_ResetPaymentDetails = {
  type: "wallet/resetPaymentDetails";
};
