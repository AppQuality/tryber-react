type WalletState = {
  requestsList: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiOperations["get-users-me-payments"]["parameters"]["query"]["order"];
    orderBy: ApiOperations["get-users-me-payments"]["parameters"]["query"]["orderBy"];
  };
  booty: {
    amount: {
      value: number;
      currency: string;
    };
    threshold?: number;
    overThreshold?: boolean;
    details?: {
      limit?: number;
      size: number;
      start: number;
      total?: number;
      items: Attribution[];
    };
  };
  paymentDetails: ApiOperations["get-users-me-payments-payment"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: "date" | "type" | "activity" | "amount";
  };
};

type Attribution = {
  id: number;
  amount: {
    value: number;
    currency: string;
  };
  activity: string;
};

type WalletActions =
  | WalletActions_UpdateRequestList
  | WalletActions_UpdateRequestQuery
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
type WalletActions_UpdateRequestQuery = {
  type: "wallet/updateReqsQuery";
  payload: ApiOperations["get-users-me-payments"]["parameters"]["query"];
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
