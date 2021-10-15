import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  toggleDashboardHelp,
  openDashboardHelp,
  closeDashboardHelp,
} from "./actionCreators";

const DashboardHelpStore = () => {
  const open: boolean = useSelector(
    (state: GeneralState) => state.dashboardHelpModal.open,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    isOpen: open,
    toggle: () => dispatch(toggleDashboardHelp()),
    open: () => dispatch(openDashboardHelp()),
    close: () => dispatch(closeDashboardHelp()),
  };
};

export default DashboardHelpStore;
