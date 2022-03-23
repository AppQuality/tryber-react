import { ThunkAction } from "redux-thunk";
import API from "src/utils/api";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

export const fetchPaymentRequests =
  (): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch, getState) => {
    const {
      wallet: { requestsList },
    } = getState();
    try {
      const query: ApiOperations["get-users-me-payments"]["parameters"]["query"] =
        {
          order: requestsList.order,
          orderBy: requestsList.orderBy,
          limit: requestsList.limit,
          start: requestsList.start,
        };
      const data = await API.getUserPaymentRequests(query);
      return dispatch({
        type: "wallet/updateRequestsList",
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      if (error.statusCode === 404) {
        const { start, limit, size } = requestsList;
        if (start - limit >= 0) {
          dispatch(updatePagination(start - limit));
        }
        return dispatch({
          type: "wallet/updateRequestsList",
          payload: {
            size: size,
            start: start,
            results: [],
          },
        });
      } else {
        addMessage(error.message, "danger", false);
      }
    }
  };

// update some query for payments requests and then update the list of item
export const updatePagination =
  (
    newStart: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    dispatch({
      type: "wallet/updateReqsQuery",
      payload: { start: newStart },
    });
    return dispatch(fetchPaymentRequests());
  };

export const updateSortingOptions =
  (
    order: ApiOperations["get-users-me-payments"]["parameters"]["query"]["order"],
    orderBy: ApiOperations["get-users-me-payments"]["parameters"]["query"]["orderBy"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    dispatch({
      type: "wallet/updateReqsQuery",
      payload: { order: order, orderBy: orderBy },
    });
    return dispatch(fetchPaymentRequests());
  };

export const fetchBooty =
  (): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    try {
      const query: ApiOperations["get-users-me"]["parameters"]["query"] = {
        fields: "booty,booty_threshold",
      };
      const data = await API.getBooty(query);
      return dispatch({
        type: "wallet/setBooty",
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      addMessage(error.message, "danger", false);
    }
  };

export const setPaymentModalOpen =
  (
    isOpen: boolean
  ): ThunkAction<Promise<any>, GeneralState, unknown, WalletActions> =>
  async (dispatch) => {
    dispatch({
      type: "wallet/togglePaymentModal",
      payload: isOpen,
    });
  };
