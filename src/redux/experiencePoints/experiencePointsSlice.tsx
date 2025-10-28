import { createSlice } from "@reduxjs/toolkit";

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

export const experiencePointsSlice = createSlice({
  name: "experiencePoints",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedCampaign: (state, action) => {
      state.selectedCampaign = action.payload;
    },
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
    },
    setDates: (state, action) => {
      state.dates = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    updateExpListQuery: (state, action) => {
      state.expList = {
        ...state.expList,
        ...action.payload,
      };
    },
    updateExpList: (state, action) => {
      state.expList = {
        ...state.expList,
        ...action.payload,
      };
      state.isLoading = false;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    updateExperiencePointsSortingOptions: (state, action) => {
      state.expList.orderBy = action.payload.orderBy;
      state.expList.order = action.payload.order;
    },
    updateExperiencePointsPagination: (state, action) => {
      state.expList.start = action.payload;
    },
  },
});

export default experiencePointsSlice.reducer;
export const {
  setSelectedDate,
  setSelectedCampaign,
  setSelectedActivity,
  setDates,
  updateExpListQuery,
  updateExpList,
  setSearch,
  setActivities,
  setCampaigns,
  setIsLoading,
  updateExperiencePointsSortingOptions,
  updateExperiencePointsPagination,
} = experiencePointsSlice.actions;
