const initialState: WalletState = {
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
    items: [],
  },
};

export default (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case "wallet/updateRequestsList":
      return {
        ...state,
        requestsList: { ...action.payload },
      };
    default:
      return state;
  }
};
