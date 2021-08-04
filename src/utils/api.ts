import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import { me, myBugs, myCampaigns, experiencePoints } from "./users";

const API = {
  login,
  campaigns,
  me,
  signup,
  myBugs,
  myCampaigns,
  experiencePoints,
};

export default API;
