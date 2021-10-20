type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  addResidenceAddressModal: AddResidenceAddressModalState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
  userDevices: UserDeviceState;
  modal: ModalState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | AddResidenceAddressModalDispatchType
  | SiteWideMessagesDispatchType
  | UserDeviceDispatchType
  | ModalDispatchType
  | ReferralDispatchType;
