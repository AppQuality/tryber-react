interface DeviceFormInterface {
  manufacturer?: string;
  model?: string;
  device?:
    | number
    | (
        | "Notebook"
        | "Desktop"
        | "Ultrabook"
        | "Gaming PC"
        | "Tablet PC / Hybrid"
      );
  device_type: number; // 0 smartphone, 1 tablet, 2 pc, 5 smartTv
  operating_system_platform: string;
  operating_system_version: string;
  operating_system_id: string;
}
