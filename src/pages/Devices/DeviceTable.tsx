import { Button, Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import DeviceIcon from "./DeviceIcon";
import styled from "styled-components";
import { Trash } from "react-bootstrap-icons";
import { useGetUsersMeDevicesQuery } from "src/services/tryberApi";
import {
  openDeleteDeviceModal,
  openEditDeviceModal,
  selectDevice,
} from "src/pages/Devices/userDevicesSlice";
import { useAppDispatch } from "src/store";

const DeviceActions = styled.div`
  display: flex;
  flex-flow: column;
  .action-text { display: none;}
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      display: block;
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
  const { data, isFetching } = useGetUsersMeDevicesQuery();
  const dispatch = useAppDispatch();
  const tableRows = data?.map((d) => {
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
              type="link-hover"
              className="aq-nopadding aq-mr-3"
            >
              <div title={t("Edit")}>{t("Edit")}</div>
            </Button>
            <Button
              onClick={() => {
                dispatch(selectDevice(d));
                dispatch(openDeleteDeviceModal());
              }}
              type="link-hover"
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
  return (
    <>
      <Table
        dataSource={tableRows || []}
        isLoading={isFetching}
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
