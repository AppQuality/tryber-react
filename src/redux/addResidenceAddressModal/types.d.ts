type AddResidenceAddressModalAction = {
  type: string;
  data?: any;
};

type AddResidenceAddressModalState = {
  open: boolean;
  country?: string;
  region?: string;
  street?: string;
};
type AddResidenceAddressModalDispatchType = (
  args: AddResidenceAddressModalAction
) => AddResidenceAddressModalAction;
