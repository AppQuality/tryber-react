import { combineReducers } from "redux";
import menu from "./menu/reducer";
import user from "./user/reducer";

export default combineReducers({
  menu,
  user,
});
