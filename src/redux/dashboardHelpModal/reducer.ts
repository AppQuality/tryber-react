import * as actionTypes from "./actionTypes";

const initialState: DashboardHelpState = {
  open: false,
};

const reducer = (
  state: DashboardHelpState = initialState,
  action: DashboardHelpAction
): DashboardHelpState => {
  switch (action.type) {
    case actionTypes.DASHBOARD_HELP_OPEN:
      return {
        ...state,
        open: true,
      };
    case actionTypes.DASHBOARD_HELP_CLOSE:
      return {
        ...state,
        open: false,
      };
    case actionTypes.DASHBOARD_HELP_TOGGLE:
      return {
        ...state,
        open: !state.open,
      };
  }
  return state;
};

export default reducer;
