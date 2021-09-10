import * as authenticate from "./authenticate";
import * as campaigns from "./campaigns";
import * as user from "./users";
import * as devices from "./devices";

const API = {
  ...authenticate,
  ...campaigns,
  ...user,
  ...devices,
};

export default API;
