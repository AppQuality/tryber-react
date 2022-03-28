import { ThunkAction } from "redux-thunk";

export const closePaymentDetailsModal =
  (): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    dispatch({
      type: "wallet/togglePaymentDetailsModal",
      payload: false,
    });
  };
