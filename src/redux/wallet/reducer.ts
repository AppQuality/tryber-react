const initialState: WalletState = {
  booty: {
    amount: 0,
  },
  requestsList: {
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    results: [],
  },
};

export default (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case "wallet/updateRequestsList":
      return {
        ...state,
        requestsList: { ...action.payload },
      };
    case "wallet/setBooty":
      return {
        ...state,
        booty: {
          amount: action.payload.booty,
          bootyThreshold: action.payload.booty_threshold,
        },
      };
    default:
      return state;
  }
};
