export const initialState: WalletState = {
  booty: {
    gross: {
      value: 0,
      currency: "EUR",
    },
    net: {
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
  isBootyDetailsModalOpen: false,
  bootyDetails: {
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    order: "DESC",
    orderBy: "attributionDate",
    results: [],
  },
  paymentInProcessing: false,
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
          net: action.payload.pending_booty?.net,
          gross: action.payload.pending_booty?.gross,
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
    case "wallet/updateBootyDetailsQuery":
      return {
        ...state,
        bootyDetails: {
          ...state.bootyDetails,
          ...action.payload,
        },
      };
    case "wallet/updateBootyDetails":
      return {
        ...state,
        bootyDetails: {
          ...state.bootyDetails,
          ...action.payload,
        },
      };
    case "wallet/toggleBootyDetailsModal":
      return {
        ...state,
        isBootyDetailsModalOpen: action.payload,
      };
    case "wallet/checkPaymentInProcessing":
      return {
        ...state,
        paymentInProcessing: action.payload,
      };
    case "wallet/resetPaymentDetails":
      return {
        ...state,
        paymentDetails: initialState.paymentDetails,
      };
    case "wallet/resetBootyDetails":
      return {
        ...state,
        bootyDetails: initialState.bootyDetails,
      };
    default:
      return state;
  }
};
