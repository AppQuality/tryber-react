import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import {
  me,
  myBugs,
  myCampaigns,
  experiencePoints,
  myPopups,
  myPopupsById,
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
};

export default API;
