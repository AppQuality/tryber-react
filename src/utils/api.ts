import * as authenticate from "./authenticate";
import * as campaigns from "./campaigns";
import * as user from "./users";
import * as devices from "./devices";
import * as geoDb from "./geoDb";

const API = {
  ...authenticate,
  ...campaigns,
  ...user,
  ...devices,
  ...geoDb,
};

export default API;
