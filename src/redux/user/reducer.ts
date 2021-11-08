import * as actionTypes from "./actionTypes";

const initialState: UserState = {
  loading: true,
  loadingProfile: true,
  isDeleteModalOpen: false,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  console.log(action.type);
  switch (action.type) {
    case actionTypes.USER_REFRESH:
      if (action.data) {
        return {
          ...state,
          user: { ...state.user, ...action.data },
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
    case actionTypes.FETCH_FISCAL_PROFILE_LOADING:
      return {
        ...state,
        error: undefined,
        loadingProfile: true,
      };
    case actionTypes.FETCH_FISCAL_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        loadingProfile: false,
      };
    case actionTypes.FETCH_FISCAL_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          fiscal: action.data
            ? { ...state?.user?.fiscal, ...action.data }
            : undefined,
        },
        loadingProfile: false,
      };

    case actionTypes.UPDATE_DELETION_REASON:
      if (action.data && "reason" in action.data) {
        return {
          ...state,
          deletionReason: action.data.reason,
        };
      }
      break;
    case actionTypes.DELETE_USER:
      return {
        ...state,
        user: undefined,
      };
    case actionTypes.OPEN_DELETE_MODAL:
      return {
        ...state,
        isDeleteModalOpen: true,
      };
    case actionTypes.CLOSE_DELETE_MODAL:
      return {
        ...state,
        isDeleteModalOpen: false,
      };
    case actionTypes.DELETE_CERTIFICATION:
      if (action.data && "newCertifications" in action.data)
        return {
          ...state,
          user: {
            ...state.user,
            certifications: action.data.newCertifications,
          },
        };
  }
  return state;
};

export default reducer;
