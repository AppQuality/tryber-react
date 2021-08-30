type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  referral: ReferralState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | ReferralDispatchType;
