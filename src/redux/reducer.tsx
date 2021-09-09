import { combineReducers } from "redux";
import menu from "./menu/reducer";
import user from "./user/reducer";
import dashboardHelpModal from "./dashboardHelpModal/reducer";
import referral from "./referral/reducer";
import messages from "./siteWideMessages/reducer";
import userDevices from "./userDevices/reducer";
import devices from "./devices/reducer";

export default combineReducers({
  menu,
  user,
  dashboardHelpModal,
  referral,
  messages,
  devices,
  userDevices,
});
