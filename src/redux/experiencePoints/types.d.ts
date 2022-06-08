type ExperiencePointsState = {
  expList: ApiOperations["get-users-me-experience"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: ExpOrderByType;
  };
  campaigns: SelectType.Option[];
  activities: SelectType.Option[];
  dates: SelectType.Option[];
  selectedCampaign?: SelectType.Option;
  selectedActivity?: SelectType.Option;
  selectedDate?: SelectType.Option;
  search?: string;
  isLoading: boolean;
};

type ExperiencePointsActions =
  | ExperiencePointsActions_UpdateExpList
  | ExperiencePointsActions_UpdateExpListQuery
  | ExperiencePointsActions_SetCampaigns
  | ExperiencePointsActions_SetActivities
  | ExperiencePointsActions_SetDates
  | ExperiencePointsActions_SetSelectedCampaign
  | ExperiencePointsActions_SetSelectedActivity
  | ExperiencePointsActions_SetSelectedDate
  | ExperiencePointsActions_SetSearch
  | ExperiencePointsActions_SetIsLoading;

type ExpOrderByType = "amount" | "date";

/**
 *  Action types and their payloads
 */
type ExperiencePointsActions_UpdateExpList = {
  type: "experiencePoints/updateExpList";
  payload: ApiOperations["get-users-me-experience"]["responses"]["200"]["content"]["application/json"];
};

type ExperiencePointsActions_UpdateExpListQuery = {
  type: "experiencePoints/updateExpListQuery";
  payload: ApiOperations["get-users-me-experience"]["parameters"]["query"];
};

type ExperiencePointsActions_SetCampaigns = {
  type: "experiencePoints/setCampaigns";
  payload: SelectType.Option[];
};

type ExperiencePointsActions_SetActivities = {
  type: "experiencePoints/setActivities";
  payload: SelectType.Option[];
};

type ExperiencePointsActions_SetDates = {
  type: "experiencePoints/setDates";
  payload: SelectType.Option[];
};

type ExperiencePointsActions_SetSelectedCampaigns = {
  type: "experiencePoints/setSelectedCampaigns";
  payload: SelectType.Option;
};

type ExperiencePointsActions_SetSelectedActivity = {
  type: "experiencePoints/setSelectedActivity";
  payload: SelectType.Option;
};

type ExperiencePointsActions_SetSelectedDate = {
  type: "experiencePoints/setSelectedDate";
  payload: SelectType.Option;
};

type ExperiencePointsActions_SetSearch = {
  type: "experiencePoints/setSearch";
  payload: string;
};

type ExperiencePointsActions_SetIsLoading = {
  type: "experiencePoints/setIsLoading";
  payload: boolean;
};
