import * as actionTypes from "./actionTypes";

export function openDashboardHelp() {
  const action: DashboardHelpAction = {
    type: actionTypes.DASHBOARD_HELP_OPEN,
  };

  return (dispatch: DashboardHelpDispatchType) => dispatch(action);
}
export function closeDashboardHelp() {
  const action: DashboardHelpAction = {
    type: actionTypes.DASHBOARD_HELP_CLOSE,
  };

  return (dispatch: DashboardHelpDispatchType) => dispatch(action);
}
export function toggleDashboardHelp() {
  const action: DashboardHelpAction = {
    type: actionTypes.DASHBOARD_HELP_TOGGLE,
  };

  return (dispatch: DashboardHelpDispatchType) => dispatch(action);
}
