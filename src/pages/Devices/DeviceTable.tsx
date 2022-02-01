import { Button, Table, TableType } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import siteWideMessageStore from "src/redux/siteWideMessages";
import userDeviceStore from "src/redux/userDevices";
import DeviceIcon from "./DeviceIcon";

const DeviceTable = () => {
  const { t } = useTranslation();
  const { devices, loading, fetch, select, openEditModal, openDeleteModal } =
    userDeviceStore();
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
            content: (
              <>
                <Button
                  onClick={() => {
                    select(d.id);
                    openEditModal();
                  }}
                  type="link-hover"
                >
                  {t("Edit")}
                </Button>
                <Button
                  onClick={() => {
                    select(d.id);
                    openDeleteModal();
                  }}
                  type="link-hover"
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
          empty: t(
            "You don't have any devices yet. Add one to participate in the tests!"
          ),
        }}
        columns={[
          {
            title: t("Type"),
            dataIndex: "type",
            key: "type",
            maxWidth: "3ch",
            align: "center",
          },
          {
            title: t("Model"),
            dataIndex: "device",
            key: "device",
            maxWidth: "15ch",
          },
          {
            title: t("Operating System"),
            dataIndex: "os",
            key: "os",
            maxWidth: "10ch",
          },
          {
            title: t("Version"),
            dataIndex: "os_version",
            key: "os_version",
            maxWidth: "25ch",
          },
          {
            title: t("Actions"),
            dataIndex: "actions",
            key: "actions",
            maxWidth: "15ch",
            align: "center",
          },
        ]}
      />
    </>
  );
};

export default DeviceTable;
