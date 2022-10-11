import menu from "./menu/reducer";
import user from "./user/reducer";
import dashboardHelpModal from "./dashboardHelpModal/reducer";
import referral from "./referral/reducer";
import messages from "./siteWideMessages/reducer";
import modal from "./modal/reducer";
import addResidenceAddressModal from "./addResidenceAddressModal/reducer";
import wallet from "./wallet/reducer";
import ranking from "./ranking/reducer";
import myBugs from "./myBugs/reducer";
import experiencePoints from "./experiencePoints/reducer";

const reducers = {
  menu,
  user,
  dashboardHelpModal,
  addResidenceAddressModal,
  referral,
  messages,
  modal,
  wallet,
  ranking,
  myBugs,
  experiencePoints,
};

export default reducers;
