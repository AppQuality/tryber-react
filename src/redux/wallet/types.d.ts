type WalletState = {
  requestsList: {
    limit?: number;
    size: number;
    start: number;
    total?: number;
    items: PaymentRequest[];
  };
  booty: {
    amount: {
      value: number;
      currency: string;
    };
    threshold: number;
    overThreshold: boolean;
    details: {
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

type PaymentRequest = {
  created: string;
  updated: string;
  id: number;
  amount: {
    value: number;
    currency: string;
  };
  type: "paypal" | "transferwise";
  tryber: {
    id: number;
    name: string;
    surname: string;
  };
  error?: string;
};
