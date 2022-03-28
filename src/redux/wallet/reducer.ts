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
  paymentDetailsModal: { isOpen: false },
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
    case "wallet/setBooty":
      return {
        ...state,
        booty: {
          amount: action.payload.pending_booty,
          bootyThreshold: action.payload.booty_threshold,
        },
      };
    case "wallet/togglePaymentModal":
      return {
        ...state,
        isPaymentModalOpen: action.payload,
      };
    case "wallet/togglePaymentDetailsModal":
      return {
        ...state,
        paymentDetailsModal:
          action.payload === false
            ? { isOpen: false }
            : { isOpen: true, paymentId: action.payload },
      };
    case "wallet/updatePaymentDetailsQuery":
      return {
        ...state,
        paymentDetails: {
          ...state.paymentDetails,
          ...action.payload,
        },
      };
    case "wallet/updatePaymentDetails":
      return {
        ...state,
        paymentDetails: {
          ...state.paymentDetails,
          ...action.payload,
        },
      };
    case "wallet/resetPaymentDetails":
      return {
        ...state,
        paymentDetails: initialState.paymentDetails,
      };
    default:
      return state;
  }
};
