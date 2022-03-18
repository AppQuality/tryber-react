type WalletState = {
  requestsList: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
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

type WalletActions = WalletActions_UpdateRequestList;

/**
 *  Action types and their payloads
 */
type WalletActions_UpdateRequestList = {
  type: "wallet/updateRequestsList";
  payload: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"];
};
