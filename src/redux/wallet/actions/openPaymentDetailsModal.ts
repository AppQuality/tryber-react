import { ThunkAction } from "redux-thunk";

export const openPaymentDetailsModal =
  (
    requestId: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    dispatch({
      type: "wallet/togglePaymentDetailsModal",
      payload: requestId,
    });
  };
