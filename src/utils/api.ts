import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import {
  me,
  myBugs,
  myCampaigns,
  myDevices,
  experiencePoints,
  myPopups,
  myPopupsById,
  setOnboardingComplete,
  getOnboardingComplete,
} from "./users";

const API = {
  login,
  campaigns,
  me,
  signup,
  myBugs,
  myPopups,
  myDevices,
  myPopupsById,
  myCampaigns,
  experiencePoints,
  setOnboardingComplete,
  getOnboardingComplete,
};

export default API;
