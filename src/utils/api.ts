import * as authenticate from "./authenticate";
import * as campaigns from "./campaigns";
import * as user from "./users";
import * as devices from "./devices";
import * as languages from "./languages";
import * as employments from "./employments";
import * as certifications from "./certifications";
import * as educationLevels from "./educationLevels";
import * as customUserFields from "./customUserFields";
import * as wallet from "./wallet";
import * as ranking from "./ranking";
import * as bugForm from "./bugForm";

const API = {
  ...authenticate,
  ...campaigns,
  ...user,
  ...devices,
  ...languages,
  ...employments,
  ...educationLevels,
  ...customUserFields,
  ...certifications,
  ...wallet,
  ...ranking,
  ...bugForm,
};

export default API;
