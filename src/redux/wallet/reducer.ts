export const initialState: WalletState = {
  booty: {
    amount: 0,
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
  isPaymentModalOpen: false,
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
    case "wallet/setBooty":
      return {
        ...state,
        booty: {
          amount: action.payload.booty,
          bootyThreshold: action.payload.booty_threshold,
        },
      };
    case "wallet/togglePaymentModal":
      return {
        ...state,
        isPaymentModalOpen: action.payload,
      };
    default:
      return state;
  }
};
