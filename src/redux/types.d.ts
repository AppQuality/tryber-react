type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
  userDevices: UserDeviceState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | SiteWideMessagesDispatchType
  | UserDeviceDispatchType
  | ReferralDispatchType;
