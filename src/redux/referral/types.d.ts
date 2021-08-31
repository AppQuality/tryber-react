type ReferralState = {
  current?: string;
};

type ReferralAction = {
  type: string;
  data?: string;
};

type ReferralDispatchType = (args: ReferralAction) => ReferralAction;
