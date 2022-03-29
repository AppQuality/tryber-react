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
  paymentDetailsModal: {
    isOpen: boolean;
    paymentId?: number;
  };
  paymentDetails: ApiOperations["get-users-me-payments-payment"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: "date" | "type" | "activity" | "amount";
  };
  isBootyDetailsModalOpen: boolean;
  bootyDetails: ApiOperations["get-users-me-pending-booty"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: "attributionDate" | "id" | "amount";
  };
};

type WalletActions =
  | WalletActions_UpdateRequestList
  | WalletActions_UpdateRequestQuery
  | WalletActions_SetBooty
  | WalletActions_TogglePaymentModal
  | WalletActions_TogglePaymentDetailsModal
  | WalletActions_UpdatePaymentDetails
  | WalletActions_UpdatePaymentDetailsQuery
  | WalletActions_ResetPaymentDetails
  | WalletActions_UpdateBootyDetails
  | WalletActions_UpdateBootyDetailsQuery
  | WalletActions_ResetBootyDetails
  | WalletActions_ToggleBootyDetailsModal;

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

type WalletActions_TogglePaymentDetailsModal = {
  type: "wallet/togglePaymentDetailsModal";
  payload: false | number;
};

type WalletActions_UpdateBootyDetails = {
  type: "wallet/updateBootyDetails";
  payload: ApiOperations["get-users-me-pending-booty"]["responses"]["200"]["content"]["application/json"];
};

type WalletActions_UpdateBootyDetailsQuery = {
  type: "wallet/updateBootyDetailsQuery";
  payload: ApiOperationsApiOperations["get-users-me-pending-booty"]["parameters"]["query"];
};

type WalletActions_ResetBootyDetails = {
  type: "wallet/resetBootyDetails";
};

type WalletActions_ToggleBootyDetailsModal = {
  type: "wallet/toggleBootyDetailsModal";
  payload: boolean;
};
