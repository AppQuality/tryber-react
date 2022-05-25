export const initialState: ExperiencePointsState = {
  expList: {
    start: 0,
    limit: 25,
    size: 0,
    total: 0,
    order: "DESC",
    orderBy: "date",
    sum: 0,
    results: [],
  },
  campaigns: [],
  activities: [],
  dates: [],
  isLoading: true,
};

export default (state = initialState, action: ExperiencePointsActions) => {
  switch (action.type) {
    case "experiencePoints/updateExpListQuery":
      return {
        ...state,
        expList: {
          ...state.expList,
          ...action.payload,
        },
      };
    case "experiencePoints/updateExpList":
      return {
        ...state,
        expList: {
          ...state.expList,
          ...action.payload,
        },
        isLoading: false,
      };
    case "experiencePoints/setCampaigns":
      return {
        ...state,
        campaigns: action.payload,
      };
    case "experiencePoints/setActivities":
      return {
        ...state,
        activities: action.payload,
      };
    case "experiencePoints/setDates":
      return {
        ...state,
        dates: action.payload,
      };
    case "experiencePoints/setSelectedCampaign":
      return {
        ...state,
        selectedCampaign: action.payload,
      };
    case "experiencePoints/setSelectedActivity":
      return {
        ...state,
        selectedActivity: action.payload,
      };
    case "experiencePoints/setSelectedDate":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "experiencePoints/setSearch":
      return {
        ...state,
        search: action.payload,
      };
    case "experiencePoints/setIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
