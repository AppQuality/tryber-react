import * as actionTypes from "./actionTypes";

const initialState: UserState = {
  loading: true,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.USER_REFRESH:
      if (action.data) {
        return {
          ...state,
          user: action.data,
          loading: false,
        };
      }
      return {
        ...state,
      };
    case actionTypes.USER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.USER_LOAD:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
  }
  return state;
};

export default reducer;
