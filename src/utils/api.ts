import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import { me, myBugs, myCampaigns, experiencePoints, myPopups } from "./users";

const API = {
  login,
  campaigns,
  me,
  signup,
  myBugs,
  myPopups,
  myCampaigns,
  experiencePoints,
};

export default API;
