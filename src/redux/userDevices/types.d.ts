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
  selected?: boolean;
  operative_system: {
    id: number;
    platform: string;
    version: string;
  };
};

type DispatchSlice = {
  fetch: () => void;
  select: (id: number) => void;
  devices: DeviceItem[];
  loading: boolean;
  error?: string;
};

type UserDeviceState = {
  items?: array<DeviceItem>;
  loading: boolean;
  error?: string;
};
type UserDeviceDispatchType = (args: DeviceAction) => DeviceAction;
