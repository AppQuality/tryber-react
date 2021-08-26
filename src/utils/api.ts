import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import {
  me,
  myBugs,
  myCampaigns,
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
  myPopupsById,
  myCampaigns,
  experiencePoints,
  setOnboardingComplete,
  getOnboardingComplete,
};

export default API;
