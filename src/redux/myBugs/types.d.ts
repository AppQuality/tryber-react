type MyBugsState = {
  bugsList: ApiOperations["get-users-me-bugs"]["responses"]["200"]["content"]["application/json"] & {
    total: number;
    limit: number;
    order: ApiComponents["parameters"]["order"];
    orderBy: BugsOrderByType;
  };
  campaigns: SelectType.Option[];
  severities: SelectType.Option[];
  status: SelectType.Option[];
  selectedCampaign?: SelectType.Option;
  selectedSeverity?: SelectType.Option;
  selectedStatus?: SelectType.Option;
  isLoading: boolean;
};

type MyBugsActions =
  | MyBugsActions_UpdateBugsList
  | MyBugsActions_UpdateBugsListQuery
  | MyBugsActions_SetCampaigns
  | MyBugsActions_SetSeverities
  | MyBugsActions_SetStatus
  | MyBugsActions_SetSelectedCampaign
  | MyBugsActions_SetSelectedSeverity
  | MyBugsActions_SetSelectedStatus
  | MyBugsActions_SetIsLoading;

type BugsOrderByType = "id" | "status" | "title" | "campaign";

/**
 *  Action types and their payloads
 */
type MyBugsActions_UpdateBugsList = {
  type: "myBugs/updateBugsList";
  payload: ApiOperations["get-users-me-bugs"]["responses"]["200"]["content"]["application/json"];
};

type MyBugsActions_UpdateBugsListQuery = {
  type: "myBugs/updateBugsListQuery";
  payload: ApiOperations["get-users-me-bugs"]["parameters"]["query"];
};

type MyBugsActions_SetCampaigns = {
  type: "myBugs/setCampaigns";
  payload: SelectType.Option[];
};

type MyBugsActions_SetSeverities = {
  type: "myBugs/setSeverities";
  payload: SelectType.Option[];
};

type MyBugsActions_SetStatus = {
  type: "myBugs/setStatus";
  payload: SelectType.Option[];
};

type MyBugsActions_SetSelectedCampaigns = {
  type: "myBugs/setSelectedCampaigns";
  payload: SelectType.Option;
};

type MyBugsActions_SetSelectedSeverity = {
  type: "myBugs/setSelectedSeverity";
  payload: SelectType.Option;
};

type MyBugsActions_SetSelectedStatus = {
  type: "myBugs/setSelectedStatus";
  payload: SelectType.Option;
};

type MyBugsActions_SetIsLoading = {
  type: "myBugs/setIsLoading";
  payload: boolean;
};
