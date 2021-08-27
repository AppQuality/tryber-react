interface LoginData {
  username: string;
  password: string;
}

type DashboardHelpAction = {
  type: string;
};

type DashboardHelpState = {
  open: boolean;
};
type DashboardHelpDispatchType = (
  args: DashboardHelpAction
) => DashboardHelpAction;
