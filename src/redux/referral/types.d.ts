type ReferralState = string | undefined;

type ReferralAction = {
  type: string;
  data?: string;
};

type ReferralDispatchType = (args: ReferralAction) => ReferralAction;
