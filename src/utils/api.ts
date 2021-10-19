import * as authenticate from "./authenticate";
import * as campaigns from "./campaigns";
import * as user from "./users";
import * as devices from "./devices";
import * as languages from "./languages";

const API = {
  ...authenticate,
  ...campaigns,
  ...user,
  ...devices,
  ...languages,
};

export default API;
