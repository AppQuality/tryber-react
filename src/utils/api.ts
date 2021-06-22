import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import { me, myBugs, experiencePoints } from "./users";

const API = {
  login,
  campaigns,
  me,
  signup,
  myBugs,
  experiencePoints,
};

export default API;
