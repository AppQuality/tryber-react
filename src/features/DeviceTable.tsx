import { Table, Button, TableType } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../redux/userDevices";
import siteWideMessageStore from "../redux/siteWideMessages";
import { useEffect } from "react";
import API from "../utils/api";

const DeviceTable = () => {
  const { t } = useTranslation();
  const { devices, loading, fetch, select, openEditModal } = userDeviceStore();
  const { add } = siteWideMessageStore();
  useEffect(() => {
    fetch();
  }, []);
  const data: TableType.Row[] = devices
    ? devices.map((d) => {
        let deviceName = "";
        if ("pc_type" in d.device) {
          deviceName = d.device.pc_type;
        } else {
          deviceName = `${d.device.manufacturer} ${d.device.model}`;
        }
        return {
          key: d.id,
          type: d.type,
          device: deviceName,
          os: d.operating_system.platform,
          os_version: d.operating_system.version,
          actions: {
            title: "asd",
            content: (
              <>
                <Button
                  onClick={() => {
                    select(d.id);
                    openEditModal();
                  }}
                  type="link"
                >
                  {t("Edit")}
                </Button>
                <Button
                  onClick={() => {
                    API.deleteDevice({ deviceId: d.id })
                      .then(() => {
                        add({ message: "Deleted", type: "success" });
                        fetch();
                      })
                      .catch(() => {
                        add({ message: "Error", type: "danger" });
                      });
                  }}
                  type="link"
                >
                  {t("Delete")}
                </Button>
              </>
            ),
          },
        };
      })
    : [];
  return (
    <>
      <Table
        dataSource={data}
        isLoading={loading}
        isStriped={true}
        i18n={{
          loading: t("Loading Data"),
          empty: t("There are no data here!"),
        }}
        columns={[
          {
            title: t("Type"),
            dataIndex: "type",
            key: "type",
            width: "15ch",
          },
          {
            title: t("Model"),
            dataIndex: "device",
            key: "device",
            width: "25ch",
          },
          {
            title: t("Operating System"),
            dataIndex: "os",
            key: "os",
            width: "15ch",
          },
          {
            title: t("Version"),
            dataIndex: "os_version",
            key: "os_version",
            width: "10ch",
          },
          {
            title: t("Actions"),
            dataIndex: "actions",
            key: "actions",
            width: "15ch",
            align: "center",
          },
        ]}
      />
    </>
  );
};

export default DeviceTable;
