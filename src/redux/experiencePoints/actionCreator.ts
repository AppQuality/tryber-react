import { SelectType } from "@appquality/appquality-design-system";
import { TFunction } from "i18next";
import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";
import dateFormatter from "../../utils/dateFormatter";
import { addMessage } from "../siteWideMessages/actionCreators";
import { mapActivityName } from "./utils";

export const fetchExperiencePoints =
  (): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch, getState) => {
    const {
      experiencePoints: {
        expList,
        selectedCampaign,
        selectedActivity,
        selectedDate,
        search,
      },
    } = getState();
    dispatch({
      type: "experiencePoints/setIsLoading",
      payload: true,
    });
    try {
      const query: ApiOperations["get-users-me-experience"]["parameters"]["query"] =
        {
          order: expList.order,
          orderBy: expList.orderBy,
          limit: expList.limit,
          start: expList.start,
          filterBy: {
            ...(selectedCampaign?.value && {
              campaign: selectedCampaign.value,
            }),
            ...(selectedActivity?.value && {
              activity: selectedActivity.value,
            }),
            ...(selectedDate?.value && { date: selectedDate.value }),
          },
          search: search,
          searchBy: search && "note",
        };
      const data = await API.experiencePoints({ query });
      dispatch({
        type: "experiencePoints/updateExpList",
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      if (error.statusCode === 404) {
        const { start, limit, size } = expList;
        if ((start || 0) - limit >= 0) {
          dispatch(updateExperiencePointsPagination((start || 0) - limit));
        }
        dispatch({
          type: "experiencePoints/updateExpList",
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
  };

export const updateExperiencePointsPagination =
  (
    newStart: number
  ): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch) => {
    dispatch({
      type: "experiencePoints/updateExpListQuery",
      payload: { start: newStart },
    });
    return dispatch(fetchExperiencePoints());
  };

export const updateExperiencePointsSortingOptions =
  (
    order: ExperiencePointsState["expList"]["order"],
    orderBy: ExperiencePointsState["expList"]["orderBy"]
  ): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch) => {
    dispatch({
      type: "experiencePoints/updateExpListQuery",
      payload: { order: order, orderBy: orderBy },
    });
    return dispatch(fetchExperiencePoints());
  };

/* export const fetchExperiencePointsFilters =
  (
    t: TFunction
  ): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch, getState) => {
    const {
      experiencePoints: {
        expList,
        selectedCampaign,
        selectedActivity,
        selectedDate,
        search,
      },
    } = getState();
    dispatch({
      type: "experiencePoints/setIsLoading",
      payload: true,
    });
    try {
      const query: ApiOperations["get-users-me-experience"]["parameters"]["query"] =
        {
          orderBy: "id",
          order: "DESC",
          filterBy: {
            ...(selectedCampaign?.value && {
              campaign: selectedCampaign.value,
            }),
            ...(selectedActivity?.value && {
              activity: selectedActivity.value,
            }),
            ...(selectedDate?.value && { date: selectedDate.value }),
          },
          search: search,
          searchBy: search && "note",
        };
      const data = await API.experiencePoints({ query });

      let _campaigns: SelectType.Option[] = [];
      let _activities: SelectType.Option[] = [];
      let _dates: SelectType.Option[] = [];

      data.results.forEach((res: any) => {
        if (
          typeof res.campaign === "undefined" ||
          typeof res.activity === "undefined" ||
          typeof res.date === "undefined"
        )
          return;
        if (res.campaign?.id && res.campaign?.title) {
          _campaigns[res.campaign.id] = {
            label: `CP${res.campaign?.id} - ${res.campaign?.title}` || "",
            value: res.campaign.id.toString(),
          };
        }
        if (res.activity?.id) {
          _activities[res.activity.id] = {
            label: mapActivityName(res.activity.id, t) || "",
            value: res.activity.id.toString(),
          };
        }
        if (res.date) {
          let d = new Date(res.date);
          _dates[d.getTime()] = {
            label: dateFormatter(res.date) || "",
            value: res.date,
          };
        }
      });

      let datesFilter = Object.values(_dates).filter((el) => el != null);
      if (expList.orderBy === "date" && expList.order === "ASC")
        datesFilter = datesFilter.reverse();

      dispatch({
        type: "experiencePoints/setCampaigns",
        payload: _campaigns.filter((el) => el != null).reverse(),
      });
      dispatch({
        type: "experiencePoints/setActivities",
        payload: _activities.filter((el) => el != null),
      });
      dispatch({
        type: "experiencePoints/setDates",
        payload: datesFilter,
      });
    } catch (e) {
      const error = e as HttpError;
      console.log(error);
    }
    dispatch({
      type: "experiencePoints/setIsLoading",
      payload: false,
    });
  }; */

export const setSelectedCampaign =
  (
    campaign: SelectType.Option
  ): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch) => {
    dispatch({
      type: "experiencePoints/setSelectedCampaign",
      payload: campaign,
    });
  };

export const setSelectedActivity =
  (
    activity: SelectType.Option
  ): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch) => {
    dispatch({
      type: "experiencePoints/setSelectedActivity",
      payload: activity,
    });
  };

export const setSelectedDate =
  (
    date: SelectType.Option
  ): ThunkAction<
    Promise<any>,
    GeneralState,
    unknown,
    ExperiencePointsActions
  > =>
  async (dispatch) => {
    dispatch({
      type: "experiencePoints/setSelectedDate",
      payload: date,
    });
  };
