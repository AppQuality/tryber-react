import { Button, Table, TableType } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import userDeviceStore from "src/redux/userDevices";
import DeviceIcon from "./DeviceIcon";
import styled from "styled-components";
import { Trash } from "react-bootstrap-icons";

const DeviceActions = styled.div`
  .action-text { display: none;}
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      .action-text { display: block; }
      .action-icon { display: none; }
    }
  }
  ${Button} {
    display: block;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      display: inline-block;
    }
  }
`;

const DeviceTable = () => {
  const { t } = useTranslation();
  const { devices, loading, fetch, select, openEditModal, openDeleteModal } =
    userDeviceStore();
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
              <DeviceActions>
                <Button
                  onClick={() => {
                    select(d.id);
                    openEditModal();
                  }}
                  type="link-hover"
                  className="aq-nopadding aq-mr-1"
                >
                  {t("Edit")}
                </Button>
                <Button
                  onClick={() => {
                    select(d.id);
                    openDeleteModal();
                  }}
                  type="link-hover"
                  className="aq-nopadding"
                >
                  <div className="action-text">{t("Delete")}</div>
                  <div className="action-icon aq-mt-3">
                    <Trash size={28} />
                  </div>
                </Button>
              </DeviceActions>
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
            align: "center",
            role: "overline",
            hideIndex: true,
          },
          {
            title: t("Model"),
            dataIndex: "device",
            key: "device",
            role: "title",
            hideIndex: true,
          },
          {
            title: t("Operating System"),
            dataIndex: "os",
            key: "os",
          },
          {
            title: t("Version"),
            dataIndex: "os_version",
            key: "os_version",
          },
          {
            title: t("Actions"),
            dataIndex: "actions",
            key: "actions",
            align: "center",
            role: "cta",
            hideIndex: true,
          },
        ]}
      />
    </>
  );
};

export default DeviceTable;
