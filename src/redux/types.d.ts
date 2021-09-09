type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
  userDevices: DeviceState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | SiteWideMessagesDispatchType
  | DeviceDispatchType
  | ReferralDispatchType;
