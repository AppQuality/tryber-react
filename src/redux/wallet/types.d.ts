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
  | WalletActions_UpdateRequestQuery;

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
