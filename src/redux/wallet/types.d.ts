type WalletState = {
  requestsList: ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
  };
  booty: {
    amount: number;
    bootyThreshold?: {
      value: number;
      isOver: boolean;
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

type WalletActions = WalletActions_UpdateRequestList | WalletActions_SetBooty;

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
