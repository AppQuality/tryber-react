type AddResidenceAddressModalAction = {
  type: string;
  data?: any;
};

type AddResidenceAddressModalState = {
  open: boolean;
  street?: string;
};
type AddResidenceAddressModalDispatchType = (
  args: AddResidenceAddressModalAction
) => AddResidenceAddressModalAction;
