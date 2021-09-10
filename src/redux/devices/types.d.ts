type ManufacturerDeviceItem = {
  manufacturer: string;
  models: array<{
    id: number;
    name: string;
  }>;
};
type ManufacturerItem = {
  items: array<ManufacturerDeviceItem>;
  current?: string;
  loading: boolean;
};
type DevicesDispatchSlice = {
  devices?: ManufacturerItem & {
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
  devices: ManufacturerItem;
};

type DeviceDispatchType = (args: DeviceAction) => DeviceAction;
