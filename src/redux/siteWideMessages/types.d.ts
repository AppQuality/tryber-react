type SiteWideMessagesAddAction = {
  type: string;
  data?: SiteWideMessage;
};
type SiteWideMessagesRemoveAction = {
  type: string;
  data?: string;
};
type SiteWideMessagesAction =
  | SiteWideMessagesAddAction
  | SiteWideMessagesRemoveAction;

type SiteWideMessage = {
  message: string;
  uuid: string;
  type: keyof Theme["palette"];
  expire?: number;
};

type SiteWideMessageAddType = {
  message: string;
  type: keyof Theme["palette"];
  expire?: number | false;
};
type SiteWideMessageRemoveType = {
  uuid: string;
};
type SiteWideMessagesState = {
  messages: array<SiteWideMessage>;
};
type SiteWideMessagesDispatchType = (
  args: SiteWideMessagesAction | SiteWideMessagesRemoveAction
) => SiteWideMessagesAction | SiteWideMessagesRemoveAction;
