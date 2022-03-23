export const initialState: WalletState = {
  booty: {
    amount: {
      value: 0,
      currency: "EUR",
    },
  },
  requestsList: {
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    order: "DESC",
    orderBy: "paidDate",
    results: [],
  },
  paymentDetails: {
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    order: "DESC",
    orderBy: "date",
    results: [],
  },
};

export default (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case "wallet/updateReqsQuery":
      return {
        ...state,
        requestsList: {
          ...state.requestsList,
          ...action.payload,
        },
      };
    case "wallet/updateRequestsList":
      return {
        ...state,
        requestsList: {
          ...state.requestsList,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
