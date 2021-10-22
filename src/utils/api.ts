import * as authenticate from "./authenticate";
import * as campaigns from "./campaigns";
import * as user from "./users";
import * as devices from "./devices";
import * as languages from "./languages";
import * as employments from "./employments";
import * as geoDb from "./geoDb";

const API = {
  ...authenticate,
  ...campaigns,
  ...user,
  ...devices,
  ...languages,
  ...geoDb,
  ...employments,
};

export default API;
