export const initialState: BugFormState = {
  mediaList: [],
  showError: false,
  bugDetailsModal: {
    open: false,
    title: "",
    type: "",
  },
};

export default (state = initialState, action: BugFormActions) => {
  switch (action.type) {
    case "bugForm/setMediaList":
      return {
        ...state,
        mediaList: action.payload,
      };
    case "bugForm/appendMediaList":
      return {
        ...state,
        mediaList: [...state.mediaList, ...action.payload],
      };
    case "bugForm/setShowError":
      return {
        ...state,
        showError: action.payload,
      };
    case "bugForm/setBugDetailsModal":
      return {
        ...state,
        bugDetailsModal: action.payload,
      };
    default:
      return state;
  }
};
