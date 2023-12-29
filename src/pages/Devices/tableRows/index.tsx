import { GetUsersMeDevicesApiResponse } from "src/services/tryberApi";
import { Button } from "@appquality/appquality-design-system";
import DeviceIcon from "src/pages/Devices/DeviceIcon";
import {
  openDeleteDeviceModal,
  openEditDeviceModal,
  selectDevice,
} from "src/pages/Devices/userDevicesSlice";
import { Trash } from "react-bootstrap-icons";
import DeviceActions from "src/pages/Devices/tableRows/DeviceActions";

export const getTableRows = (
  data: GetUsersMeDevicesApiResponse,
  dispatch: any,
  t: any
) => {
  return data.map((d) => {
    let deviceName;
    if ("pc_type" in d.device) {
      deviceName = d.device.pc_type;
    } else {
      deviceName = `${d.device.manufacturer} ${d.device.model}`;
    }
    return {
      key: d.id,
      type: {
        title: d.type,
        content: (
          <DeviceIcon
            className="aq-text-secondary"
            device_type={d.type}
            size={20}
          />
        ),
      },
      device: deviceName,
      os: d.operating_system.platform,
      os_version: d.operating_system.version,
      actions: {
        title: "",
        content: (
          <DeviceActions>
            <Button
              onClick={() => {
                dispatch(selectDevice(d));
                dispatch(openEditDeviceModal());
              }}
              kind="link-hover"
              className="aq-nopadding aq-mr-3"
            >
              <div title={t("Edit")}>{t("Edit")}</div>
            </Button>
            <Button
              onClick={() => {
                dispatch(selectDevice(d));
                dispatch(openDeleteDeviceModal());
              }}
              kind="link-hover"
              className="aq-nopadding"
            >
              <div className="action-text" title={t("Delete")}>
                {t("Delete")}
              </div>
              <div className="action-icon aq-mt-3">
                <Trash size={28} />
              </div>
            </Button>
          </DeviceActions>
        ),
      },
    };
  });
};
