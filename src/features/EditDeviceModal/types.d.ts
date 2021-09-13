interface DeviceFormInterface {
  pc_type?: string;
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
  device_type: 0 | 1 | 2 | 3 | 4 | 5; // 0 smartphone, 1 tablet, 2 pc, 3 console, 4 smartwatch,  5 smartTv
  operating_system_platform: string;
  operating_system_version: string;
  operating_system_id: string;
}
