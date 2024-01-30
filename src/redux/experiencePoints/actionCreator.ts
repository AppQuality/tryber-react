import { ThunkAction } from "redux-thunk";

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
  };
/* 
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
*/
