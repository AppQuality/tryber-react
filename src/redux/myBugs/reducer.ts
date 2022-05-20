export const initialState: MyBugsState = {
  bugsList: {
    start: 0,
    limit: 25,
    size: 0,
    total: 0,
    order: "DESC",
    orderBy: "id",
    results: [],
  },
  campaigns: [],
  severities: [],
  status: [],
};

export default (state = initialState, action: MyBugsActions) => {
  switch (action.type) {
    case "myBugs/updateBugsListQuery":
      return {
        ...state,
        bugsList: {
          ...state.bugsList,
          ...action.payload,
        },
      };
    case "myBugs/updateBugsList":
      return {
        ...state,
        bugsList: {
          ...state.bugsList,
          ...action.payload,
        },
      };
    case "myBugs/setCampaigns":
      return {
        ...state,
        campaigns: action.payload,
      };
    case "myBugs/setSeverities":
      return {
        ...state,
        severities: action.payload,
      };
    case "myBugs/setStatus":
      return {
        ...state,
        status: action.payload,
      };
    case "myBugs/setSelectedCampaign":
      return {
        ...state,
        selectedCampaign: action.payload,
      };
    case "myBugs/setSelectedSeverity":
      return {
        ...state,
        selectedSeverity: action.payload,
      };
    case "myBugs/setSelectedStatus":
      return {
        ...state,
        selectedStatus: action.payload,
      };
    default:
      return state;
  }
};
