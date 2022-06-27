export const initialState: BugFormState = {
  mediaList: [],
  showError: false,
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

    default:
      return state;
  }
};
