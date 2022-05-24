type GeneralState = {
  menu: MenuState;
  user: UserState;
  dashboardHelpModal: DashboardHelpState;
  addResidenceAddressModal: AddResidenceAddressModalState;
  referral: ReferralState;
  messages: SiteWideMessagesState;
  userDevices: UserDeviceState;
  modal: ModalState;
  wallet: WalletState;
  ranking: RankingState;
  myBugs: MyBugsState;
  experiencePoints: ExperiencePointsState;
};

type AppDispatch = typeof store.dispatch;

type DispatchType =
  | UserDispatchType
  | MenuDispatchType
  | DashboardHelpDispatchType
  | AddResidenceAddressModalDispatchType
  | SiteWideMessagesDispatchType
  | UserDeviceDispatchType
  | ModalDispatchType
  | ReferralDispatchType;
