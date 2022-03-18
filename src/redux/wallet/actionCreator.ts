import { ThunkAction } from "redux-thunk";

export const fetchPaymentRequests =
  (): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch, getState) => {};

// update some query for payments requests and then update the list of item
export const updatePagination =
  (
    newStart: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    return dispatch(fetchPaymentRequests());
  };
