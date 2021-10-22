type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
  userDevices: UserDeviceState;
  modal: ModalState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | SiteWideMessagesDispatchType
  | UserDeviceDispatchType
  | ModalDispatchType
  | ReferralDispatchType;
