import { login, signup } from "./authenticate";
import { campaigns } from "./campaigns";
import { me, myBugs } from "./users";

const API = {
  login: login,
  campaigns: campaigns,
  me: me,
  signup: signup,
  myBugs: myBugs,
};

export default API;
