type ManufacturerItem = {
  items: array<string>;
  current?: string;
  loading: boolean;
};
type DevicesDispatchSlice = {
  manufacturer?: ManufacturerItem & {
    fetch: () => void;
    select: (manufacturer: string) => void;
  };
};

type DeviceAction = {
  type: string;
  data?: array<any>;
  error?: string;
};

type DeviceState = {
  manufacturer: ManufacturerItem;
};

type DeviceDispatchType = (args: DeviceAction) => DeviceAction;
