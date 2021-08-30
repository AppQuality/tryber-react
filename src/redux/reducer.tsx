import { combineReducers } from "redux";
import menu from "./menu/reducer";
import user from "./user/reducer";
import dashboardHelpModal from "./dashboardHelpModal/reducer";
import referral from "./referral/reducer";

export default combineReducers({
  menu,
  user,
  dashboardHelpModal,
  referral,
});
