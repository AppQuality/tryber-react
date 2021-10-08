import * as actionTypes from "./actionTypes";

const initialState: UserState = {
  loading: true,
  loadingProfile: true,
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
    case actionTypes.FETCH_PROFILE_LOADING:
      return {
        ...state,
        error: undefined,
        loadingProfile: true,
      };
    case actionTypes.FETCH_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        loadingProfile: false,
      };
    case actionTypes.FETCH_PROFILE:
      return action.data
        ? {
            ...state,
            user: { ...state.user, ...action.data },
            loadingProfile: false,
          }
        : state;
  }
  return state;
};

export default reducer;
