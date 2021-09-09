type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
  userDevices: UserDeviceState;
  devices: DeviceState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | SiteWideMessagesDispatchType
  | DeviceDispatchType
  | UserDeviceDispatchType
  | DeviceDispatchType
  | ReferralDispatchType;
