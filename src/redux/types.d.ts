type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | SiteWideMessagesDispatchType
  | ReferralDispatchType;
