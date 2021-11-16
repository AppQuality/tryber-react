import * as actionTypes from "./actionTypes";

const initialState: UserState = {
  loading: true,
  loadingProfile: true,
  isDeleteModalOpen: false,
  user: {
    fiscal: {
      data: undefined,
      loading: true,
    },
  },
};

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  // @ts-ignore
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
        user: {
          ...state.user,
          fiscal: {
            data: state.user.fiscal.data,
            loading: true,
          },
        },
      };
    case actionTypes.FETCH_FISCAL_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        user: {
          ...state.user,
          fiscal: {
            data: state.user.fiscal.data,
            loading: false,
          },
        },
      };
    case actionTypes.FETCH_FISCAL_PROFILE:
      if (action.data) {
        return {
          ...state,
          user: {
            ...state.user,
            fiscal: {
              data: action.data,
              loading: false,
            },
          },
        };
      }
      break;
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
    case actionTypes.UPDATE_CERTIFICATIONS:
      if (action.data && "newCertifications" in action.data)
        return {
          ...state,
          user: {
            ...state.user,
            certifications: action.data.newCertifications,
          },
        };
      break;
    case actionTypes.GET_CUSTOM_USER_FIELDS:
      if (action.data)
        return {
          ...state,
          customUserFields: action.data,
        };
  }
  return state;
};

export default reducer;
