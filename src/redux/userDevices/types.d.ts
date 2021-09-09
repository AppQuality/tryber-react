type DeviceAction = {
  type: string;
  data?: array<DeviceItem>;
  error?: string;
};

type DeviceItemPc = {
  pc_type: string;
};
type DeviceItemOther = {
  manufacturer: string;
  model: string;
};

type DeviceItem = {
  id: number;
  device: DeviceItemPc | DeviceItemOther;
  type: string;
  operative_system: {
    id: number;
    platform: string;
    version: string;
  };
};

type DispatchSlice = {
  fetch: () => void;
  devices: DeviceItem[];
  loading: boolean;
  error?: string;
};

type DeviceState = {
  items?: array<DeviceItem>;
  loading: boolean;
  error?: string;
};
type DeviceDispatchType = (args: DeviceAction) => DeviceAction;
