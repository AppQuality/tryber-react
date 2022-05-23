import { SelectType } from "@appquality/appquality-design-system";
import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";
import { addMessage } from "../siteWideMessages/actionCreators";

export const fetchMyBugs =
  (): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch, getState) => {
    const {
      myBugs: { bugsList, selectedCampaign, selectedSeverity, selectedStatus },
    } = getState();
    dispatch({
      type: "myBugs/setIsLoading",
      payload: true,
    });
    try {
      const query: ApiOperations["get-users-me-bugs"]["parameters"]["query"] = {
        order: bugsList.order,
        orderBy: bugsList.orderBy,
        limit: bugsList.limit,
        start: bugsList.start,
        filterBy: {
          ...(selectedCampaign?.value && { campaign: selectedCampaign.value }),
          ...(selectedSeverity?.value && { severity: selectedSeverity.value }),
          ...(selectedStatus?.value && { status: selectedStatus.value }),
        },
      };
      const data = await API.myBugs({ query });
      dispatch({
        type: "myBugs/updateBugsList",
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      if (error.statusCode === 404) {
        const { start, limit, size } = bugsList;
        if ((start || 0) - limit >= 0) {
          dispatch(updateMybugsPagination((start || 0) - limit));
        }
        dispatch({
          type: "myBugs/updateBugsList",
          payload: {
            size: size,
            start: start,
            results: [],
          },
        });
      } else {
        addMessage(error.message, "danger", false);
      }
    }
    dispatch({
      type: "myBugs/setIsLoading",
      payload: false,
    });
  };

export const updateMybugsPagination =
  (
    newStart: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch) => {
    dispatch({
      type: "myBugs/updateBugsListQuery",
      payload: { start: newStart },
    });
    return dispatch(fetchMyBugs());
  };

export const updateMybugsSortingOptions =
  (
    order: MyBugsState["bugsList"]["order"],
    orderBy: MyBugsState["bugsList"]["orderBy"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch) => {
    dispatch({
      type: "myBugs/updateBugsListQuery",
      payload: { order: order, orderBy: orderBy },
    });
    return dispatch(fetchMyBugs());
  };

export const fetchMyBugsFilters =
  (): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch, getState) => {
    const {
      myBugs: { selectedCampaign, selectedSeverity, selectedStatus },
    } = getState();
    dispatch({
      type: "myBugs/setIsLoading",
      payload: true,
    });
    try {
      const query: ApiOperations["get-users-me-bugs"]["parameters"]["query"] = {
        orderBy: "id",
        order: "DESC",
        filterBy: {
          ...(selectedCampaign?.value && { campaign: selectedCampaign.value }),
          ...(selectedSeverity?.value && { severity: selectedSeverity.value }),
          ...(selectedStatus?.value && { status: selectedStatus.value }),
        },
      };
      const data = await API.myBugs({ query });

      let _campaigns: SelectType.Option[] = [];
      let _severities: SelectType.Option[] = [];
      let _status: SelectType.Option[] = [];

      data.results.forEach((res: any) => {
        if (
          typeof res.campaign === "undefined" ||
          typeof res.status === "undefined" ||
          typeof res.severity === "undefined"
        )
          return;
        if (res.campaign?.id) {
          _campaigns[res.campaign.id] = {
            label: `CP${res.campaign?.id} - ${res.campaign?.name}` || "",
            value: res.campaign.id.toString(),
          };
        }
        if (res.severity?.id) {
          _severities[res.severity.id] = {
            label: res.severity.name || "",
            value: res.severity.id.toString(),
          };
        }
        if (res.status?.id) {
          _status[res.status.id] = {
            label: res.status.name || "",
            value: res.status.id.toString(),
          };
        }
      });

      dispatch({
        type: "myBugs/setCampaigns",
        payload: _campaigns.filter((el) => el != null).reverse(),
      });
      dispatch({
        type: "myBugs/setSeverities",
        payload: _severities.filter((el) => el != null),
      });
      dispatch({
        type: "myBugs/setStatus",
        payload: _status.filter((el) => el != null),
      });
    } catch (e) {
      const error = e as HttpError;
      console.log(error);
    }
    dispatch({
      type: "myBugs/setIsLoading",
      payload: false,
    });
  };

export const setSelectedCampaign =
  (
    campaign: SelectType.Option
  ): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch) => {
    dispatch({
      type: "myBugs/setSelectedCampaign",
      payload: campaign,
    });
  };

export const setSelectedSeverity =
  (
    severity: SelectType.Option
  ): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch) => {
    dispatch({
      type: "myBugs/setSelectedSeverity",
      payload: severity,
    });
  };

export const setSelectedStatus =
  (
    status: SelectType.Option
  ): ThunkAction<Promise<any>, GeneralState, unknown, MyBugsActions> =>
  async (dispatch) => {
    dispatch({
      type: "myBugs/setSelectedStatus",
      payload: status,
    });
  };
